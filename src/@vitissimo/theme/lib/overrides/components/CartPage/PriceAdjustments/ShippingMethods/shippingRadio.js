import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { number, string, shape } from 'prop-types';

import Price from '@magento/venia-ui/lib/components/Price';

import classes from './shippingRadio.css';

const ShippingRadio = props => {
    const priceElement = props.price ? (
        <Price value={props.price} />
    ) : (
        <span>
            <FormattedMessage id={'global.free'} defaultMessage={'FREE'} />
        </span>
    );

    return (
        <Fragment>
            <span>{props.name}</span>
            <div className={classes.price}>{priceElement}</div>
        </Fragment>
    );
};

export default ShippingRadio;

ShippingRadio.propTypes = {
    classes: shape({
        root: string,
        price: string
    }),
    currency: string.isRequired,
    name: string.isRequired,
    price: number.isRequired
};
