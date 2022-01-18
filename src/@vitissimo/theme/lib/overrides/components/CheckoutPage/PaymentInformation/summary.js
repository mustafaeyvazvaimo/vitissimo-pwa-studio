import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string, func } from 'prop-types';

import { useSummary } from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/useSummary';

import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import summaryPayments from './summaryPaymentCollection';

import classes from './summary.css';

const Summary = props => {
    const { onEdit } = props;
    const talonProps = useSummary();
    const { isLoading, selectedPaymentMethod } = talonProps;

    if (isLoading && !selectedPaymentMethod) {
        return (
            <LoadingIndicator classes={{ root: classes.loading }}>
                <FormattedMessage
                    id={'checkoutPage.loadingPaymentInformation'}
                    defaultMessage={'Fetching Payment Information'}
                />
            </LoadingIndicator>
        );
    }

    const hasCustomSummaryComp = Object.keys(summaryPayments).includes(
        selectedPaymentMethod.code
    );

    if (hasCustomSummaryComp) {
        const SummaryPaymentMethodComponent =
            summaryPayments[selectedPaymentMethod.code];
        return <SummaryPaymentMethodComponent onEdit={onEdit} />;
    } else {
        return (
            <div className={classes.root}>
                <div className={classes.heading_container}>
                    <h5 className={classes.heading}>
                        <FormattedMessage
                            id={'checkoutPage.paymentInformation'}
                            defaultMessage={'Payment Information'}
                        />
                    </h5>
                </div>
                <div className={classes.card_details_container}>
                    <span className={classes.payment_details}>
                        {selectedPaymentMethod.title}
                    </span>
                </div>
            </div>
        );
    }
};

export default Summary;

Summary.propTypes = {
    classes: shape({
        root: string,
        heading_container: string,
        heading: string,
        card_details_container: string,
        payment_details: string
    }),
    onEdit: func.isRequired
};
