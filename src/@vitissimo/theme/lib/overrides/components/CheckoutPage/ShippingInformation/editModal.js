import React from 'react';
import { FormattedMessage } from 'react-intl';
import { object, shape, string } from 'prop-types';

import { useEditModal } from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/useEditModal';

import { Portal } from '@magento/venia-ui/lib/components/Portal';
import AddressForm from './AddressForm/addressForm';

import { CloseIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './editModal.css';

const EditModal = props => {
    const { shippingData, onSuccess } = props;
    const talonProps = useEditModal();
    const { handleClose, isOpen } = talonProps;

    const rootClass = isOpen ? classes.root_open : classes.root;

    // Unmount the form to force a reset back to original values on close
    const bodyElement = isOpen ? (
        <AddressForm
            onSuccess={onSuccess}
            afterSubmit={handleClose}
            onCancel={handleClose}
            shippingData={shippingData}
        />
    ) : null;

    return (
        <Portal>
            <aside className={rootClass}>
                <div className={classes.header}>
                    <span className={classes.headerText}>
                        <FormattedMessage
                            id={'checkoutPage.editShippingInfo'}
                            defaultMessage={'Edit Shipping Information'}
                        />
                    </span>
                    <button
                        className={classes.closeButton}
                        onClick={handleClose}
                    >
                        <CloseIcon color="#EC0008" />
                    </button>
                </div>
                <div className={classes.body}>{bodyElement}</div>
            </aside>
        </Portal>
    );
};

export default EditModal;

EditModal.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        body: string,
        header: string,
        headerText: string
    }),
    shippingData: object
};
