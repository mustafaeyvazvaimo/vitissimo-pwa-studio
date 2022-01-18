import React, { Suspense } from 'react';
import { FormattedMessage } from 'react-intl';
import { Form } from 'informed';
import { shape, func, string, bool, instanceOf } from 'prop-types';

import { usePaymentInformation } from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/usePaymentInformation';
import CheckoutError from '@magento/peregrine/lib/talons/CheckoutPage/CheckoutError';

import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

import paymentInformationOperations from './paymentInformation.gql';

import classes from './paymentInformation.css';

const PaymentMethods = React.lazy(() => import('./paymentMethods'));
const Summary = React.lazy(() => import('./summary'));

const PaymentInformation = props => {
    const {
        onSave,
        resetShouldSubmit,
        setCheckoutStep,
        shouldSubmit,
        checkoutError
    } = props;

    const talonProps = usePaymentInformation({
        onSave,
        checkoutError,
        resetShouldSubmit,
        setCheckoutStep,
        shouldSubmit,
        ...paymentInformationOperations
    });

    const {
        doneEditing,
        handlePaymentError,
        handlePaymentSuccess,
        isLoading,
        showEditModal
    } = talonProps;

    if (isLoading) {
        return (
            <LoadingIndicator classes={{ root: classes.loading }}>
                <FormattedMessage
                    id={'checkoutPage.loadingPaymentInformation'}
                    defaultMessage={'Fetching Payment Information'}
                />
            </LoadingIndicator>
        );
    }

    const paymentInformation = doneEditing ? (
        <Summary onEdit={showEditModal} />
    ) : (
        <Form>
            <PaymentMethods
                onPaymentError={handlePaymentError}
                onPaymentSuccess={handlePaymentSuccess}
                resetShouldSubmit={resetShouldSubmit}
                shouldSubmit={shouldSubmit}
            />
        </Form>
    );

    return (
        <div className={classes.root}>
            <div className={classes.payment_info_container}>
                <Suspense fallback={null}>{paymentInformation}</Suspense>
            </div>
        </div>
    );
};

export default PaymentInformation;

PaymentInformation.propTypes = {
    classes: shape({
        container: string,
        payment_info_container: string,
        review_order_button: string
    }),
    onSave: func.isRequired,
    checkoutError: instanceOf(CheckoutError),
    resetShouldSubmit: func.isRequired,
    shouldSubmit: bool
};
