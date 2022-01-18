import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

import classes from './card.css';

const Card = props => {
    const { shippingData } = props;
    const {
        city,
        email,
        firstname,
        lastname,
        postcode,
        street,
        telephone
    } = shippingData;

    const streetRows = street.map((row, index) => {
        return <span key={index}>{row}</span>;
    });

    const nameString = `${firstname} ${lastname}`;
    const additionalAddressString = `${postcode} ${city}`;

    return (
        <div className={classes.root}>
            <span>{email}</span>
            <span>{nameString}</span>
            <span>{telephone}</span>
            <div className={classes.address}>
                {streetRows}
                <span>{additionalAddressString}</span>
            </div>
        </div>
    );
};

export default Card;

Card.propTypes = {
    classes: shape({
        root: string,
        address: string,
        area: string
    }),
    shippingData: shape({
        city: string.isRequired,
        email: string.isRequired,
        firstname: string.isRequired,
        lastname: string.isRequired,
        postcode: string.isRequired,
        street: arrayOf(string).isRequired,
        telephone: string.isRequired
    }).isRequired
};
