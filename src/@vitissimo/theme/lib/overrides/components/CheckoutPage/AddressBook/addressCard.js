import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string, bool, func, arrayOf } from 'prop-types';

import { useAddressCard } from '@magento/peregrine/lib/talons/CheckoutPage/AddressBook/useAddressCard';

import { EditIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './addressCard.css';

const AddressCard = props => {
    const { address, isSelected, onEdit, onSelection } = props;

    const talonProps = useAddressCard({
        address,
        onEdit,
        onSelection
    });
    const {
        handleClick,
        handleEditAddress,
        handleKeyPress,
        hasUpdate
    } = talonProps;

    const {
        city,
        default_shipping,
        firstname,
        lastname,
        postcode,
        street
    } = address;

    const streetRows = street.map((row, index) => {
        return <span key={index}>{row}</span>;
    });

    const rootClass = isSelected
        ? hasUpdate
            ? classes.root_updated
            : classes.root_selected
        : classes.root;

    const editButton = isSelected ? (
        <button className={classes.editButton} onClick={handleEditAddress}>
            <EditIcon size={16} />
        </button>
    ) : null;

    const defaultBadge = default_shipping ? (
        <span className={classes.defaultBadge}>
            <FormattedMessage
                id={'addressCard.defaultText'}
                defaultMessage={'Default'}
            />
        </span>
    ) : null;

    const nameString = `${firstname} ${lastname}`;
    const additionalAddressString = `${postcode} ${city}`;

    return (
        <div
            className={rootClass}
            onClick={handleClick}
            onKeyPress={handleKeyPress}
            role="button"
            tabIndex="0"
        >
            {editButton}
            {defaultBadge}
            <span className={classes.name}>{nameString}</span>
            {streetRows}
            <span>{additionalAddressString}</span>
        </div>
    );
};

export default AddressCard;

AddressCard.propTypes = {
    address: shape({
        city: string,
        default_shipping: bool,
        firstname: string,
        lastname: string,
        postcode: string,
        street: arrayOf(string)
    }).isRequired,
    classes: shape({
        root: string,
        root_selected: string,
        root_updated: string,
        editButton: string,
        editIcon: string,
        defaultBadge: string,
        name: string,
        address: string
    }),
    isSelected: bool.isRequired,
    onEdit: func.isRequired,
    onSelection: func.isRequired
};
