import { useCallback } from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useAppContext } from '@magento/peregrine/lib/context/app';

export const useAuthBar = props => {
    const { disabled, showMyAccount, showSignIn } = props;
    const [{ isSignedIn: isUserSignedIn }] = useUserContext();
    const [appState, { closeDrawer }] = useAppContext();
    const { drawer } = appState;
    const isOpen = drawer === 'nav';

    const handleSignIn = useCallback(() => {
        showSignIn();
        closeDrawer();
    }, [showSignIn]);

    const handleShowMyAccount = useCallback(() => {
        showMyAccount();
        closeDrawer();
    }, [showMyAccount]);

    return {
        handleShowMyAccount,
        handleSignIn,
        isDisabled: disabled,
        isUserSignedIn,
        isOpen
    };
};
