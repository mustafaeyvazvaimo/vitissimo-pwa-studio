import React, { useCallback, useState, Fragment, useEffect } from 'react';
import { string, shape } from 'prop-types';
import { useQuery } from '@apollo/client';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import defaultOperations from './productPrice.gql';

import Price from '@magento/venia-ui/lib/components/Price';

import classes from './productPrice.css';

const ProductPrice = props => {
    const { sku } = props;
    const [discountPercent, setDiscountPercent] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(null);
    const [regularPrice, setRegularPrice] = useState(null);
    const operations = mergeOperations(defaultOperations);
    const { getPriceRangeQuery } = operations;

    const { data } = useQuery(getPriceRangeQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: { sku: sku }
    });

    const getDiscountPercent = useCallback(() => {
        return data && data.products
            ? data.products.items[0].price_range.minimum_price.discount
                  .percent_off
            : null;
    }, [data]);

    const getDiscountPrice = useCallback(() => {
        return data && data.products
            ? data.products.items[0].price_range.minimum_price.final_price.value
            : null;
    }, [data]);

    const getRegularPrice = useCallback(() => {
        return data && data.products
            ? data.products.items[0].price_range.minimum_price.regular_price
                  .value
            : null;
    }, [data]);

    useEffect(async () => {
        try {
            await setDiscountPercent(getDiscountPercent);
            await setDiscountPrice(getDiscountPrice);
            await setRegularPrice(getRegularPrice);
        } catch (error) {
            console.log(error);
        }
    }, [data]);

    const checkDiscount =
        data &&
        data.products.items[0].price_range.minimum_price.discount
            .percent_off !== 0;

    const content = checkDiscount ? (
        <Fragment>
            <span className={classes.regularPrice}>
                <Price value={regularPrice} />
            </span>
            <span
                className={classes.discountPercent}
            >{`-${discountPercent}%`}</span>
            <span className={classes.discountPrice}>
                <Price value={discountPrice} />
            </span>
        </Fragment>
    ) : (
        <Fragment>
            <span className={classes.normalPrice}>
                <Price value={regularPrice} />
            </span>
        </Fragment>
    );

    return <Fragment>{content}</Fragment>;
};

ProductPrice.propTypes = {
    classes: shape({
        regularPrice: string,
        discountPercent: string,
        discountPrice: string,
        normalPrice: string
    }),
    sku: string
};

export default ProductPrice;
