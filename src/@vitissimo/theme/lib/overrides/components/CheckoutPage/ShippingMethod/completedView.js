import React from 'react';
import { FormattedMessage } from 'react-intl';
import { func, number, shape, string } from 'prop-types';

import Price from '@magento/venia-ui/lib/components/Price';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

import { EditIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './completedView.css';

const CompletedView = props => {
    const { selectedShippingMethod, showUpdateMode } = props;

    let contents;
    if (!selectedShippingMethod) {
        // Error state.
        contents = (
            <span className={classes.error}>
                <FormattedMessage
                    id={'completedView.errorLoading'}
                    defaultMessage={
                        'Error loading selected shipping method. Please select again.'
                    }
                />
            </span>
        );
    } else {
        const { amount, carrier_title } = selectedShippingMethod;
        const { value } = amount;

        const priceElement = value ? (
            <div>
                <Price value={value} />
            </div>
        ) : (
            <span className={classes.free}>
                <FormattedMessage id={'global.free'} defaultMessage={'Free'} />
            </span>
        );

        contents = (
            <div className={classes.contents}>
                <span>{carrier_title}</span>
                {priceElement}
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <span className={classes.titleContainer}>
                    <h5 className={classes.heading}>
                        <FormattedMessage
                            id={'completedView.shippingMethod'}
                            defaultMessage={'Shipping Method'}
                        />
                    </h5>
                    <LinkButton
                        className={classes.editButton}
                        onClick={showUpdateMode}
                    >
                        <EditIcon size={16} />
                        <span className={classes.editButtonText}>
                            <FormattedMessage
                                id={'global.editButton'}
                                defaultMessage={'Edit'}
                            />
                        </span>
                    </LinkButton>
                </span>
                {contents}
            </div>
        </div>
    );
};

export default CompletedView;

CompletedView.propTypes = {
    classes: shape({
        button: string,
        container: string,
        contents: string,
        editButton: string,
        editButtonText: string,
        editIcon: string,
        error: string,
        free: string,
        heading: string,
        root: string,
        titleContainer: string
    }),
    selectedShippingMethod: shape({
        amount: shape({
            currency: string,
            value: number
        }),
        carrier_code: string,
        carrier_title: string,
        method_code: string,
        method_title: string
    }),
    showUpdateMode: func
};
