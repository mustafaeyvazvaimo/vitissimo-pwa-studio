import React from 'react';
import { FormattedMessage } from 'react-intl';

import configuredVariant from '@magento/peregrine/lib/util/configuredVariant';

import ProductOptions from '@magento/venia-ui/lib/components/LegacyMiniCart/productOptions';
import Image from '@magento/venia-ui/lib/components/Image';

import classes from './item.css';

const Item = props => {
    const {
        product,
        quantity,
        configurable_options,
        isHidden,
        configurableThumbnailSource
    } = props;

    const className = isHidden ? classes.root_hidden : classes.root;
    const configured_variant = configuredVariant(configurable_options, product);

    return (
        <div className={className}>
            <Image
                alt={product.name}
                classes={{ root: classes.thumbnail }}
                width={100}
                resource={
                    configurableThumbnailSource === 'itself' &&
                    configured_variant
                        ? configured_variant.thumbnail.url
                        : product.thumbnail.url
                }
            />
            <span className={classes.name}>{product.name}</span>
            <ProductOptions
                options={configurable_options}
                classes={{
                    options: classes.options
                }}
            />
            <span className={classes.quantity}>
                <FormattedMessage
                    id={'checkoutPage.quantity'}
                    defaultMessage={'Qty :'}
                    values={{ quantity }}
                />
            </span>
        </div>
    );
};

export default Item;
