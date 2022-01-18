import React from 'react';
import { useIntl } from 'react-intl';
import { shape, string } from 'prop-types';

import { useAccountChip } from '@magento/peregrine/lib/talons/AccountChip/useAccountChip';
import { GET_CUSTOMER_DETAILS } from '@magento/venia-ui/lib/components/AccountChip/accountChip.gql';

import { LoaderIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './accountChip.css';

const AccountChip = props => {
    const { fallbackText } = props;

    const talonProps = useAccountChip({
        queries: {
            getCustomerDetailsQuery: GET_CUSTOMER_DETAILS
        }
    });
    const { currentUser, isLoadingUserName, isUserSignedIn } = talonProps;
    const { formatMessage } = useIntl();

    let chipText;
    if (!isUserSignedIn) {
        chipText = fallbackText;
    } else {
        if (!isLoadingUserName) {
            chipText = formatMessage(
                { id: 'accountChip.chipText', defaultMessage: 'Hi' },
                {
                    name: currentUser.firstname + ' ' + currentUser.lastname
                }
            );
        } else {
            chipText = (
                <LoaderIcon className={classes.loader} color="#EC0008" />
            );
        }
    }

    return <span className={classes.root}>{chipText}</span>;
};

export default AccountChip;

AccountChip.propTypes = {
    classes: shape({
        root: string,
        loader: string
    }),
    fallbackText: string
};

AccountChip.defaultProps = {
    fallbackText: ''
};
