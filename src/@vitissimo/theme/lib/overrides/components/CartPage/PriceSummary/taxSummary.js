import React from 'react';
import { useIntl } from 'react-intl';

import Price from '@magento/venia-ui/lib/components/Price';

const getEstimatedTax = (applied_taxes = []) => {
    return {
        currency: applied_taxes[0].amount.currency,
        value: applied_taxes.reduce((acc, tax) => acc + tax.amount.value, 0)
    };
};

const TaxSummary = props => {
    const { data, isCheckout } = props;
    const { formatMessage } = useIntl();

    // Don't render estimated taxes until an address has been provided which
    // causes the server to apply a tax value to the cart.
    if (!data.length) {
        return null;
    }

    const taxLabel = isCheckout
        ? formatMessage({
              id: 'taxSummary.tax',
              defaultMessage: 'Tax'
          })
        : formatMessage({
              id: 'taxSummary.estimatedTax',
              defaultMessage: 'Estimated Tax'
          });

    const tax = getEstimatedTax(props.data);

    return (
        <>
            <span className={classes.lineItemLabel}>{taxLabel}</span>
            <span className={classes.price}>
                <Price value={tax.value} />
            </span>
        </>
    );
};

export default TaxSummary;
