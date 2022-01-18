import React, { Fragment, Suspense } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { Form } from 'informed';

import { useProductFullDetail } from '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
import Button from '@magento/venia-ui/lib/components/Button';
import Carousel from '@magento/venia-ui/lib/components/ProductImageCarousel';
import FormError from '@magento/venia-ui/lib/components/FormError';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import { QuantityFields } from '@magento/venia-ui/lib/components/CartPage/ProductListing/quantity';
import RichText from '@magento/venia-ui/lib/components/RichText';

import Tabs from '@magento/pagebuilder/lib/ContentTypes/Tabs';

import TagList from '@vitissimo/theme/lib/components/TagList';
import { InfoIcon } from '@vitissimo/theme/lib/components/Icons';
import ProductPrice from '@vitissimo/theme/lib/components/ProductPrice';

import classes from './productFullDetail.css';

const WishlistButton = React.lazy(() =>
    import('@vitissimo/theme/lib/components/WishlistButton')
);
const Options = React.lazy(() => import('../ProductOptions/options'));

// Correlate a GQL error message to a field. GQL could return a longer error
// string but it may contain contextual info such as product id. We can use
// parts of the string to check for which field to apply the error.
const ERROR_MESSAGE_TO_FIELD_MAPPING = {
    'The requested qty is not available': 'quantity',
    'Product that you are trying to add is not available.': 'quantity',
    "The product that was requested doesn't exist.": 'quantity'
};

// Field level error messages for rendering.
const ERROR_FIELD_TO_MESSAGE_MAPPING = {
    quantity: 'The requested quantity is not available.'
};

const ProductFullDetail = props => {
    const { product } = props;
    const { formatMessage } = useIntl();
    const talonProps = useProductFullDetail({ product });

    const {
        breadcrumbCategoryId,
        errorMessage,
        handleAddToCart,
        handleSelectionChange,
        isAddToCartDisabled,
        isSupportedProductType,
        mediaGalleryEntries,
        productDetails,
        wishlistButtonProps
    } = talonProps;

    const tabProps = {
        tabNavigationAlignment: 'left',
        minHeight: '2rem',
        defaultIndex: 0,
        headers: ['Productomschrijving', 'Product Details'],
        border: 'solid',
        borderColor: '#e5e5e5',
        borderWidth: '2px',
        borderRadius: '5px',
        marginTop: '5rem',
        marginBottom: '2rem',
        marginRight: '0px',
        marginLeft: '0px',
        paddingTop: '5px',
        paddingRight: '5px',
        paddingBottom: '5px',
        paddingLeft: '5px',
        cssClasses: ['description', 'details']
    };

    const options = isProductConfigurable(product) ? (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Options
                onSelectionChange={handleSelectionChange}
                options={product.configurable_options}
            />
        </Suspense>
    ) : null;

    const breadcrumbs = breadcrumbCategoryId ? (
        <Breadcrumbs
            categoryId={breadcrumbCategoryId}
            currentProduct={productDetails.name}
        />
    ) : null;

    // Fill a map with field/section -> error.
    const errors = new Map();
    if (errorMessage) {
        Object.keys(ERROR_MESSAGE_TO_FIELD_MAPPING).forEach(key => {
            if (errorMessage.includes(key)) {
                const target = ERROR_MESSAGE_TO_FIELD_MAPPING[key];
                const message = ERROR_FIELD_TO_MESSAGE_MAPPING[target];
                errors.set(target, message);
            }
        });

        // Handle cases where a user token is invalid or expired. Preferably
        // this would be handled elsewhere with an error code and not a string.
        if (errorMessage.includes('The current user cannot')) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorToken',
                        defaultMessage:
                            'There was a problem with your cart. Please sign in again and try adding the item once more.'
                    })
                )
            ]);
        }

        // Handle cases where a cart wasn't created properly.
        if (
            errorMessage.includes('Variable "$cartId" got invalid value null')
        ) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorCart',
                        defaultMessage:
                            'There was a problem with your cart. Please refresh the page and try adding the item once more.'
                    })
                )
            ]);
        }

        // An unknown error should still present a readable message.
        if (!errors.size) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorUnknown',
                        defaultMessage:
                            'Could not add item to cart. Please check required options and try again.'
                    })
                )
            ]);
        }
    }

    const cartActionContent = isSupportedProductType ? (
        <Button disabled={isAddToCartDisabled} priority="high" type="submit">
            <FormattedMessage
                id={'productFullDetail.cartAction'}
                defaultMessage={'Add to Cart'}
            />
        </Button>
    ) : (
        <div className={classes.unavailableContainer}>
            <InfoIcon color="#EC0008" />
            <p>
                <FormattedMessage
                    id={'productFullDetail.unavailableProduct'}
                    defaultMessage={
                        'This product is currently unavailable for purchase.'
                    }
                />
            </p>
        </div>
    );

    const [{ isSignedIn }] = useUserContext();

    const isDesc =
        productDetails.description === '' ? (
            <p className={classes.noDescription}>
                <InfoIcon color="#EC0008" size={14} />
                &nbsp;
                <FormattedMessage
                    id={'productFullDetail.noDescription'}
                    defaultMessage={'There is no description for this product.'}
                />
            </p>
        ) : (
            <RichText content={productDetails.description} />
        );

    const itemdetails = [
        {
            name: 'Naam',
            detail: productDetails.name
        },
        {
            name: 'Prijs',
            detail:
                productDetails.price.currency +
                ' ' +
                productDetails.price.value.toFixed(2)
        },
        {
            name: 'Sku',
            detail: productDetails.sku
        }
    ];

    const isDetails =
        itemdetails.length > 0 ? (
            <ul>
                {itemdetails.map((item, i) => (
                    <li key={i}>
                        <p>
                            {item.name}: <span>{item.detail}</span>
                        </p>
                    </li>
                ))}
            </ul>
        ) : (
            <p className={classes.noDetails}>
                <InfoIcon color="#EC0008" size={14} />
                &nbsp;
                <FormattedMessage
                    id={'productFullDetail.noDetails'}
                    defaultMessage={'There are no product details.'}
                />
            </p>
        );

    return (
        <Fragment>
            {breadcrumbs}
            <Form className={classes.root} onSubmit={handleAddToCart}>
                <section className={classes.title}>
                    <h1 className={classes.productName}>
                        {productDetails.name}
                    </h1>
                    <p className={classes.productPrice}>
                        <ProductPrice sku={productDetails.sku} />
                    </p>
                </section>
                <div className={classes.wrapper}>
                    <div className={classes.carouselWrapper}>
                        <section className={classes.imageCarousel}>
                            <Carousel images={mediaGalleryEntries} />
                        </section>
                        <Tabs {...tabProps}>
                            <div className={classes.description}>
                                {isDesc}
                                <TagList
                                    tagListData={productDetails.tagListData}
                                />
                            </div>
                            <div className={classes.details}>{isDetails}</div>
                        </Tabs>
                    </div>
                    <div className={classes.optionsWrapper}>
                        <FormError
                            classes={{
                                root: classes.formErrors
                            }}
                            errors={errors.get('form') || []}
                        />
                        <section className={classes.options}>{options}</section>
                        <Fragment>
                            <section className={classes.quantity}>
                                <h2 className={classes.quantityTitle}>
                                    <FormattedMessage
                                        id={'global.quantity'}
                                        defaultMessage={'Quantity'}
                                    />
                                </h2>
                                <div className={classes.quantityFields}>
                                    <QuantityFields
                                        classes={{
                                            root: classes.quantityRoot
                                        }}
                                        min={1}
                                        message={errors.get('quantity')}
                                    />
                                </div>
                            </section>
                            <section className={classes.actions}>
                                {cartActionContent}
                                {isSignedIn && (
                                    <Suspense fallback={null}>
                                        <div className={classes.wishlistButton}>
                                            <WishlistButton
                                                {...wishlistButtonProps}
                                            />
                                        </div>
                                    </Suspense>
                                )}
                            </section>
                        </Fragment>
                    </div>
                </div>
            </Form>
        </Fragment>
    );
};

ProductFullDetail.propTypes = {
    classes: shape({
        cartActions: string,
        description: string,
        details: string,
        imageCarousel: string,
        options: string,
        productName: string,
        productPrice: string,
        quantity: string,
        quantityTitle: string,
        root: string,
        title: string,
        unavailableContainer: string
    }),
    product: shape({
        __typename: string,
        id: number,
        sku: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                })
            }).isRequired
        }).isRequired,
        media_gallery_entries: arrayOf(
            shape({
                label: string,
                position: number,
                disabled: bool,
                file: string.isRequired
            })
        ),
        description: string
    }).isRequired
};

export default ProductFullDetail;
