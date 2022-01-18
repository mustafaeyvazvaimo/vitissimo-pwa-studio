import React, { Fragment, Suspense } from 'react';
import { shape, string } from 'prop-types';
import { Link } from 'react-router-dom';

import { useAccountTrigger } from '@magento/peregrine/lib/talons/Header/useAccountTrigger';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import { UserIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './accountTrigger.css';

const AccountMenu = React.lazy(() =>
    import('@magento/venia-ui/lib/components/AccountMenu')
);

const AccountTrigger = () => {
    const talonProps = useAccountTrigger();
    const {
        accountMenuIsOpen,
        accountMenuRef,
        accountMenuTriggerRef,
        setAccountMenuIsOpen,
        handleTriggerClick
    } = talonProps;

    const rootClassName = accountMenuIsOpen ? classes.root_open : classes.root;
    const icon = <UserIcon color="#000000" size={30} strokeWidth={1.5} />;
    const [{ isSignedIn }] = useUserContext();

    const showContent = isSignedIn ? (
        <Fragment>
            <div className={rootClassName} ref={accountMenuTriggerRef}>
                <button
                    className={classes.trigger}
                    onClick={handleTriggerClick}
                >
                    {icon}
                </button>
            </div>
            <Suspense fallback={null}>
                <AccountMenu
                    ref={accountMenuRef}
                    accountMenuIsOpen={accountMenuIsOpen}
                    setAccountMenuIsOpen={setAccountMenuIsOpen}
                />
            </Suspense>
        </Fragment>
    ) : (
        <div className={rootClassName}>
            <button className={classes.trigger} onClick={handleTriggerClick}>
                <Link to="/aanmelden">{icon}</Link>
            </button>
        </div>
    );

    return showContent;
};

export default AccountTrigger;

AccountTrigger.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        trigger: string
    })
};
