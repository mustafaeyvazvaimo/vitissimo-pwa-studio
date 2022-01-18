import React from 'react';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';

import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import CreateAccount from '@vitissimo/theme/lib/overrides/components/CreateAccount/createAccount';
import { useCreateAccountPage } from './useCreateAccountPage';

import classes from './createAccountPage.css';

const CreateAccountPage = props => {
    const { createAccountProps } = useCreateAccountPage(props);
    const { formatMessage } = useIntl();

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'createAccountPage.title',
                    defaultMessage: 'Create an Account'
                })}
            </StoreTitle>
            <div className={classes.contentContainer}>
                <CreateAccount {...createAccountProps} />
            </div>
        </div>
    );
};

CreateAccountPage.defaultProps = {
    signedInRedirectUrl: '/',
    signInPageUrl: '/aanmelden'
};

CreateAccountPage.propTypes = {
    classes: shape({
        root: string,
        contentContainer: string
    }),
    signedInRedirectUrl: string,
    signInPageUrl: string
};

export default CreateAccountPage;
