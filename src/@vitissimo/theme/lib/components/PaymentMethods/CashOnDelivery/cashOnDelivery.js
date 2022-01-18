import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string, bool, func } from 'prop-types';

import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useCashOnDelivery } from './useCashOnDelivery';

import BillingAddress from '@magento/venia-ui/lib/components/CheckoutPage/BillingAddress/billingAddress';

import classes from './cashOnDelivery.css';

const CashOnDelivery = props => {
    const {
        onBillingAddressChangedError,
        onBillingAddressChangedSuccess
    } = useCashOnDelivery(props);

    const [{ isSignedIn }] = useUserContext();

    const isGuestOrNot = {
        display: isSignedIn || !isSignedIn && 'none'
    };

    return (
        <div className={classes.root}>
            <h3 className={classes.title}>
                <FormattedMessage
                    id={'cashOnDeliveryMessage.title'}
                    defaultMessage={'Afhalen in de winkel'}
                />
            </h3>
            <div className={classes.info}>
                <FormattedMessage
                    id={'cashOnDeliveryMessage.info'}
                    defaultMessage={
                        'U zult een e-mail ontvangen wanneer uw bestelling klaar ligt om opgehaald te worden.'
                    }
                />
            </div>
            <div style={isGuestOrNot}>
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

CashOnDelivery.propTypes = {
    classes: shape({ root: string, title: string, info: string }),
    mailingAddress: string,
    shouldSubmit: bool.isRequired,
    onPaymentSuccess: func,
    onPaymentReady: func,
    onPaymentError: func,
    resetShouldSubmit: func.isRequired
};

export default CashOnDelivery;
