import React, { Fragment, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { useToasts } from '@magento/peregrine';
import { useWishlistItem } from '@magento/peregrine/lib/talons/WishlistPage/useWishlistItem';

import Image from '@magento/venia-ui/lib/components/Image';

import { TrashIcon } from '@vitissimo/theme/lib/components/Icons';
import ProductPrice from '@vitissimo/theme/lib/components/ProductPrice';

import classes from './wishlistItem.css';

const WishlistItem = props => {
    const { item } = props;
    const { configurable_options: configurableOptions = [], product } = item;
    const { name, stock_status: stockStatus } = product;

    const talonProps = useWishlistItem(props);
    const {
        addToCartButtonProps,
        handleRemoveProductFromWishlist,
        hasError,
        isRemovalInProgress,
        isSupportedProductType
    } = talonProps;

    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (hasError) {
            addToast({
                type: 'error',
                message: formatMessage({
                    id: 'wishlistItem.addToCartError',
                    defaultMessage:
                        'Something went wrong. Please refresh and try again.'
                }),
                timeout: 5000
            });
        }
    }, [addToast, formatMessage, hasError]);

    const optionElements = useMemo(() => {
        return configurableOptions.map(option => {
            const {
                id,
                option_label: optionLabel,
                value_label: valueLabel
            } = option;

            const optionString = `${optionLabel} : ${valueLabel}`;

            return (
                <p className={classes.option} key={id}>
                    {optionString}
                </p>
            );
        });
    }, [classes.option, configurableOptions]);

    const imageProps = {
        classes: {
            image:
                stockStatus === 'OUT_OF_STOCK'
                    ? classes.image_disabled
                    : classes.image
        },
        ...talonProps.imageProps
    };

    const removeProductAriaLabel = formatMessage({
        id: 'wishlistItem.removeAriaLabel',
        defaultMessage: 'Remove Product from whislist'
    });

    const rootClass = isRemovalInProgress
        ? classes.root_disabled
        : classes.root;

    const addToCart = isSupportedProductType ? (
        <Fragment>
            <button className={classes.addToCart} {...addToCartButtonProps}>
                {formatMessage({
                    id: 'wishlistItem.addToCart',
                    defaultMessage: 'Add to Cart'
                })}
            </button>
        </Fragment>
    ) : null;

    return (
        <div className={rootClass}>
            <div className={classes.headerContainer}>
                <div className={classes.priceContainer}>
                    <ProductPrice sku={product.sku} />
                </div>
                <div className={classes.remove}>
                    <button
                        className={classes.deleteItem}
                        onClick={handleRemoveProductFromWishlist}
                        ariaLabel={removeProductAriaLabel}
                    >
                        <TrashIcon size={18} color="#EC0008" />
                    </button>
                </div>
            </div>
            <Image {...imageProps} />
            <div className={classes.actionWrap}>
                <div className={classes.name}>{name}</div>
                <div className={classes.options}>{optionElements}</div>
            </div>
            {addToCart}
        </div>
    );
};

export default WishlistItem;
