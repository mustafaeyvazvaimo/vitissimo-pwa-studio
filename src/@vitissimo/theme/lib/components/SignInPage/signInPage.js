import React from 'react';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';

import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import SignIn from '@vitissimo/theme/lib/overrides/components/SignIn/signIn';
import { useSignInPage } from './useSignInPage';

import classes from './signInPage.css';

const SignInPage = props => {
    const { signInProps } = useSignInPage(props);
    const { formatMessage } = useIntl();

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'signInPage.title',
                    defaultMessage: 'Sign In'
                })}
            </StoreTitle>
            <div className={classes.contentContainer}>
                <SignIn {...signInProps} />
            </div>
        </div>
    );
};

SignInPage.defaultProps = {
    createAccountPageUrl: '/account-aanmaken',
    forgotPasswordPageUrl: '/wachtwoord-vergeten',
    signedInRedirectUrl: '/'
};

SignInPage.propTypes = {
    classes: shape({
        root: string,
        contentContainer: string
    }),
    createAccountPageUrl: string,
    forgotPasswordPageUrl: string,
    signedInRedirectUrl: string
};

export default SignInPage;
