import React from 'react';
import { shape, string } from 'prop-types';

import { useNavigation } from '@magento/peregrine/lib/talons/Navigation/useNavigation';

import CategoryTree from '@magento/venia-ui/lib/components/CategoryTree';
import AuthBar from '@magento/venia-ui/lib/components/AuthBar';
import NavHeader from './navHeader';

import Nav from '@vitissimo/theme/lib/components/Navigation';

import classes from './navigation.css';

const Navigation = props => {
    const {
        catalogActions,
        categoryId,
        handleBack,
        handleClose,
        hasModal,
        isOpen,
        isTopLevel,
        setCategoryId,
        showMyAccount,
        showSignIn,
        view
    } = useNavigation();

    const rootClassName = isOpen ? classes.root_open : classes.root;
    const bodyClassName = hasModal ? classes.body_masked : classes.body;

    return (
        <aside className={rootClassName}>
            <header className={classes.header}>
                <NavHeader
                    isTopLevel={isTopLevel}
                    onBack={handleBack}
                    view={view}
                />
                <AuthBar
                    showMyAccount={showMyAccount}
                    showSignIn={showSignIn}
                />
            </header>
            <div className={bodyClassName}>
                <CategoryTree
                    categoryId={categoryId}
                    onNavigate={handleClose}
                    setCategoryId={setCategoryId}
                    updateCategories={catalogActions.updateCategories}
                />
                <div className={classes.nav}>
                    <Nav />
                </div>
            </div>
        </aside>
    );
};

export default Navigation;

Navigation.propTypes = {
    classes: shape({
        body: string,
        form_closed: string,
        form_open: string,
        footer: string,
        header: string,
        root: string,
        root_open: string,
        signIn_closed: string,
        signIn_open: string
    })
};
