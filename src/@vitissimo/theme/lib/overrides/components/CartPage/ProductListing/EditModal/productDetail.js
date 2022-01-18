import React from 'react';
import { useIntl } from 'react-intl';

import Price from '@magento/venia-ui/lib/components/Price';
import Image from '@magento/venia-ui/lib/components/Image';

import classes from './productDetail.css';

const IMAGE_SIZE = 240;

const ProductDetail = props => {
    const { item, variantPrice } = props;
    const { formatMessage } = useIntl();
    const { prices, product } = item;
    const { price } = prices;
    const { value: unitPrice } = variantPrice || price;
    const {
        name,
        small_image: smallImage,
        stock_status: stockStatusValue
    } = product;
    const { url: imageURL } = smallImage;
    const stockStatusLabels = new Map([
        [
            'IN_STOCK',
            formatMessage({
                id: 'productDetail.inStock',
                defaultMessage: 'In stock'
            })
        ],
        [
            'OUT_OF_STOCK',
            formatMessage({
                id: 'productDetail.outOfStock',
                defaultMessage: 'Out of stock'
            })
        ]
    ]);
    const stockStatus =
        stockStatusLabels.get(stockStatusValue) ||
        formatMessage({
            id: 'productDetail.unknown',
            defaultMessage: 'Unknown'
        });

    return (
        <div className={classes.root}>
            <Image
                alt={name}
                classes={{
                    image: classes.image,
                    root: classes.imageContainer
                }}
                width={IMAGE_SIZE}
                resource={imageURL}
            />
            <div className={classes.productName}>
                {name}
                <span className={classes.stockRow}>{stockStatus}</span>
            </div>
            <div className={classes.stockRow} />
            <div className={classes.price}>
                <Price value={unitPrice} />
            </div>
        </div>
    );
};

export default ProductDetail;
