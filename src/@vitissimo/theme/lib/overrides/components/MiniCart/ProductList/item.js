import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { string, number, shape, func, arrayOf, oneOf } from 'prop-types';

import { useItem } from '@magento/peregrine/lib/talons/MiniCart/useItem';
import configuredVariant from '@magento/peregrine/lib/util/configuredVariant';
import { Link, resourceUrl } from '@vitissimo/theme/lib/drivers';

import ProductOptions from '@magento/venia-ui/lib/components/LegacyMiniCart/productOptions';
import Image from '@magento/venia-ui/lib/components/Image';

import { TrashIcon } from '@vitissimo/theme/lib/components/Icons';
import ProductPrice from '@vitissimo/theme/lib/components/ProductPrice';

import classes from './item.css';

const Item = props => {
    const {
        product,
        id,
        quantity,
        configurable_options,
        handleRemoveItem,
        closeMiniCart,
        configurableThumbnailSource
    } = props;

    const { formatMessage } = useIntl();
    const itemLink = useMemo(
        () => resourceUrl(`/${product.url_key}${product.url_suffix || ''}`),
        [product.url_key, product.url_suffix]
    );

    const stockStatusText =
        product.stock_status === 'OUT_OF_STOCK'
            ? formatMessage({
                  id: 'productList.outOfStock',
                  defaultMessage: 'Out-of-stock'
              })
            : '';

    const { isDeleting, removeItem } = useItem({
        id,
        handleRemoveItem
    });

    const rootClass = isDeleting ? classes.root_disabled : classes.root;
    const configured_variant = configuredVariant(configurable_options, product);

    return (
        <div className={rootClass}>
            <Link
                className={classes.thumbnailContainer}
                to={itemLink}
                onClick={closeMiniCart}
            >
                <Image
                    alt={product.name}
                    width={100}
                    resource={
                        configurableThumbnailSource === 'itself' &&
                        configured_variant
                            ? configured_variant.thumbnail.url
                            : product.thumbnail.url
                    }
                />
            </Link>
            <div className={classes.name}>
                <Link to={itemLink} onClick={closeMiniCart}>
                    {product.name}
                </Link>
                <button
                    onClick={removeItem}
                    type="button"
                    className={classes.deleteButton}
                    disabled={isDeleting}
                >
                    <TrashIcon color="#EC0008" size={20} />
                </button>
            </div>
            <ProductOptions
                options={configurable_options}
                classes={{
                    options: classes.options
                }}
            />
            <span className={classes.quantity}>
                <FormattedMessage
                    id={'productList.quantity'}
                    defaultMessage={'Qty : '}
                    values={{ quantity }}
                />
                <span> x </span>
                <span className={classes.price}>
                    <ProductPrice sku={product.sku} />
                </span>
            </span>
            <span className={classes.stockStatus}>{stockStatusText}</span>
        </div>
    );
};

export default Item;

Item.propTypes = {
    classes: shape({
        root: string,
        thumbnail: string,
        name: string,
        options: string,
        quantity: string,
        price: string,
        editButton: string,
        editIcon: string
    }),
    product: shape({
        name: string,
        sku: string,
        thumbnail: shape({
            url: string
        })
    }),
    id: string,
    quantity: number,
    configurable_options: arrayOf(
        shape({
            id: number,
            option_label: string,
            value_id: number,
            value_label: string
        })
    ),
    handleRemoveItem: func,
    prices: shape({
        price: shape({
            value: number,
            currency: string
        })
    }),
    configured_variant: shape({
        thumbnail: shape({
            url: string
        })
    }),
    configurableThumbnailSource: oneOf(['parent', 'itself'])
};
