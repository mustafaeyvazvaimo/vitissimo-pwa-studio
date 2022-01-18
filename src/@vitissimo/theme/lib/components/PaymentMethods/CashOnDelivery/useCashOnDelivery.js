import { useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

import DEFAULT_OPERATIONS from './cashOnDelivery.gql';

export const useCashOnDelivery = props => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);

    const {
        getCheckmoConfigQuery,
        setPaymentMethodOnCartMutation
    } = operations;

    const [{ cartId }] = useCartContext();
    const { data } = useQuery(getCheckmoConfigQuery);

    const { resetShouldSubmit, onPaymentSuccess, onPaymentError } = props;

    const [
        updatePaymentMethod,
        {
            error: paymentMethodMutationError,
            called: paymentMethodMutationCalled,
            loading: paymentMethodMutationLoading
        }
    ] = useMutation(setPaymentMethodOnCartMutation);

    const onBillingAddressChangedError = useCallback(() => {
        resetShouldSubmit();
    }, [resetShouldSubmit]);

    const onBillingAddressChangedSuccess = useCallback(() => {
        updatePaymentMethod({
            variables: { cartId }
        });
    }, [updatePaymentMethod, cartId]);

    useEffect(() => {
        const paymentMethodMutationCompleted =
            paymentMethodMutationCalled && !paymentMethodMutationLoading;

        if (paymentMethodMutationCompleted && !paymentMethodMutationError) {
            onPaymentSuccess();
        }

        if (paymentMethodMutationCompleted && paymentMethodMutationError) {
            onPaymentError();
        }
    }, [
        paymentMethodMutationError,
        paymentMethodMutationLoading,
        paymentMethodMutationCalled,
        onPaymentSuccess,
        onPaymentError,
        resetShouldSubmit
    ]);

    return {
        payableTo:
            data && data.storeConfig && data.storeConfig.payment_payable_to,
        mailingAddress:
            data &&
            data.storeConfig &&
            data.storeConfig.payment_mailing_address,
        onBillingAddressChangedError,
        onBillingAddressChangedSuccess
    };
};
