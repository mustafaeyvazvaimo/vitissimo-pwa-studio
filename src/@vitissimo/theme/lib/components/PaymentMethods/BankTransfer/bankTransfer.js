import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string, bool, func } from 'prop-types';

import { useUserContext } from '@magento/peregrine/lib/context/user';

import BillingAddress from '@magento/venia-ui/lib/components/CheckoutPage/BillingAddress/billingAddress';
import { useBankTransfer } from './useBankTransfer';

import classes from './bankTransfer.css';

const BankTransfer = props => {
    const {
        onBillingAddressChangedError,
        onBillingAddressChangedSuccess
    } = useBankTransfer(props);

    const [{ isSignedIn }] = useUserContext();

    // const isGuestOrNot = {
    //     display: !isSignedIn ? 'block' : 'none'
    // };

    return (
        <div className={classes.root}>
            <h3 className={classes.title}>
                <FormattedMessage
                    id={'bankTransferMessage.title'}
                    defaultMessage={'Overschrijving per bank'}
                />
            </h3>
            <div className={classes.info}>
                <FormattedMessage
                    id={'bankTransferMessage.info'}
                    defaultMessage={
                        'U krijgt een bevestigings e-mail met daarin de QR-code om de betaling te doen. De verzendkosten worden berekent aan de hand van uw bestelling.'
                    }
                />
            </div>
            <div>
                <BillingAddress
                    resetShouldSubmit={props.resetShouldSubmit}
                    shouldSubmit={props.shouldSubmit}
                    onBillingAddressChangedError={onBillingAddressChangedError}
                    onBillingAddressChangedSuccess={
                        onBillingAddressChangedSuccess
                    }
                />
            </div>
        </div>
    );
};

BankTransfer.propTypes = {
    classes: shape({ root: string, title: string, info: string }),
    mailingAddress: string,
    shouldSubmit: bool.isRequired,
    onPaymentSuccess: func,
    onPaymentReady: func,
    onPaymentError: func,
    resetShouldSubmit: func.isRequired
};

export default BankTransfer;
