import React from 'react';
import { func, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Link } from '@vitissimo/theme/lib/drivers';
import { useAccountMenuItems } from '@magento/peregrine/lib/talons/AccountMenu/useAccountMenuItems';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import AccountChip from '@magento/venia-ui/lib/components/AccountChip';

import classes from './accountMenuItems.css';

const AccountMenuItems = props => {
    const { onSignOut } = props;

    const talonProps = useAccountMenuItems({ onSignOut });
    const { handleSignOut, menuItems } = talonProps;
    const [{ isSignedIn }] = useUserContext();

    const menu = menuItems.map(item => {
        return (
            <Link className={classes.link} key={item.name} to={item.url}>
                <FormattedMessage id={item.id} defaultMessage={item.name} />
            </Link>
        );
    });

    return (
        <div className={classes.root}>
            {isSignedIn && <AccountChip />}
            {menu}
            <button
                className={classes.signOut}
                onClick={handleSignOut}
                type="button"
            >
                <FormattedMessage
                    id={'accountMenu.signOutButtonText'}
                    defaultMessage={'Sign Out'}
                />
            </button>
        </div>
    );
};

export default AccountMenuItems;

AccountMenuItems.propTypes = {
    classes: shape({
        link: string,
        signOut: string
    }),
    onSignOut: func
};
