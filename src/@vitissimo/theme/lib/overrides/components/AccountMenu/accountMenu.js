import React from 'react';
import { shape, string } from 'prop-types';

import { useAccountMenu } from '@magento/peregrine/lib/talons/Header/useAccountMenu';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import AccountMenuItems from './accountMenuItems';

import classes from './accountMenu.css';

const AccountMenu = React.forwardRef((props, ref) => {
    const { accountMenuIsOpen, setAccountMenuIsOpen } = props;
    const talonProps = useAccountMenu({
        accountMenuIsOpen,
        setAccountMenuIsOpen
    });
    const { handleSignOut } = talonProps;

    const rootClass = accountMenuIsOpen ? classes.root_open : classes.root;
    const contentsClass = accountMenuIsOpen
        ? classes.contents_open
        : classes.contents;

    const [{ isSignedIn }] = useUserContext();

    const dropdownContents = isSignedIn ? (
        <AccountMenuItems onSignOut={handleSignOut} />
    ) : (
        <div className={classes.noContent} />
    );

    return (
        <aside className={rootClass}>
            <div ref={ref} className={contentsClass}>
                {accountMenuIsOpen ? (
                    dropdownContents
                ) : (
                    <div className={classes.noContent} />
                )}
            </div>
        </aside>
    );
});

export default AccountMenu;

AccountMenu.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        contents_open: string,
        contents: string
    })
};
