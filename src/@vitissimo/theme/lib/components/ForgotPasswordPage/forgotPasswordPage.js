import React from 'react';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';

import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import ForgotPassword from '@magento/venia-ui/lib/components/ForgotPassword';
import { useForgotPasswordPage } from './useForgotPasswordPage';

import classes from './forgotPasswordPage.css';

const ForgotPasswordPage = props => {
    const { forgotPasswordProps } = useForgotPasswordPage(props);
    const { formatMessage } = useIntl();

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'forgotPasswordPage.title',
                    defaultMessage: 'Forgot Your Password?'
                })}
            </StoreTitle>
            <div className={classes.contentContainer}>
                <ForgotPassword {...forgotPasswordProps} />
            </div>
        </div>
    );
};

ForgotPasswordPage.defaultProps = {
    signedInRedirectUrl: '/teamwear',
    signInPageUrl: '/aanmelden'
};

ForgotPasswordPage.propTypes = {
    classes: shape({
        root: string,
        contentContainer: string
    }),
    signedInRedirectUrl: string,
    signInPageUrl: string
};

export default ForgotPasswordPage;
