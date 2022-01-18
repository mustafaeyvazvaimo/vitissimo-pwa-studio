import { useCallback } from 'react';

import { useHistory } from '@vitissimo/theme/lib/drivers';
import { useUserContext } from '@magento/peregrine/lib/context/user';

export const useMyAccountPage = () => {
    const history = useHistory();
    const [{ isSignedIn }, { signOut }] = useUserContext();

    const handleSignOut = useCallback(async () => {
        await signOut();
        history.push('/')
    }, [signOut, history]);

    return {
        isSignedIn,
        handleSignOut
    };
};
