import { useCallback } from 'react';
import { useAppContext } from '@magento/peregrine/lib/context/app';

export const useNav = () => {
    const [appState, { closeDrawer }] = useAppContext();
    const { drawer } = appState;
    const isOpen = drawer === 'nav';

    const handleClose = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    return {
        handleClose,
        isOpen
    };
};
