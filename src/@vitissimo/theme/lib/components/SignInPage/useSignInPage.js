import { useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { useUserContext } from '@magento/peregrine/lib/context/user';

export const useSignInPage = props => {
    const {
        createAccountPageUrl,
        forgotPasswordPageUrl,
        signedInRedirectUrl
    } = props;
    const history = useHistory();
    const [{ isSignedIn }] = useUserContext();

    // Keep location state in memory when pushing history and redirect to
    // the `from` url instead when signing in
    const historyState = useMemo(() => {
        return history && history.location.state ? history.location.state : {};
    }, [history]);
    const fromRedirectUrl = historyState.from || null;

    // Redirect if user is signed in
    useEffect(() => {
        if (isSignedIn) {
            if (fromRedirectUrl || signedInRedirectUrl) {
                history.push(fromRedirectUrl || signedInRedirectUrl);
            }
        }
    }, [history, isSignedIn, fromRedirectUrl, signedInRedirectUrl]);

    const handleShowCreateAccount = useCallback(() => {
        if (createAccountPageUrl) {
            history.push(createAccountPageUrl, historyState);
        }
    }, [createAccountPageUrl, history, historyState]);

    const handleShowForgotPassword = useCallback(() => {
        if (forgotPasswordPageUrl) {
            history.push(forgotPasswordPageUrl, historyState);
        }
    }, [forgotPasswordPageUrl, history, historyState]);

    const signInProps = {
        classes: { modal_active: undefined },
        showCreateAccount: handleShowCreateAccount,
        showForgotPassword: handleShowForgotPassword
    };

    return {
        signInProps
    };
};
