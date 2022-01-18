import React from 'react';
import { FormattedMessage } from 'react-intl';

import PriceSummary from '../../CartPage/PriceSummary/priceSummary';

import classes from './orderSummary.css';

const OrderSummary = props => {
    return (
        <div className={classes.root}>
            <h1 className={classes.title}>
                <FormattedMessage
                    id={'checkoutPage.orderSummary'}
                    defaultMessage={'Order Summary'}
                />
            </h1>
            <PriceSummary isUpdating={props.isUpdating} />
        </div>
    );
};

export default OrderSummary;
