import React from 'react';
import { bool, func, shape, string } from 'prop-types';

import { Link, resourceUrl } from '@vitissimo/theme/lib/drivers';

import { useAuthBar } from '@magento/peregrine/lib/talons/AuthBar/useAuthBar';

import { UserIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './authBar.css';

const AuthBar = props => {
    const {
        isUserSignedIn,
        isDisabled,
        handleSignIn,
        handleShowMyAccount,
        isOpen
    } = useAuthBar(props);

    const aanmelden = resourceUrl('/aanmelden');
    const mijnAccount = resourceUrl('/mijn-account');
    const icon = <UserIcon color="#EC0008" size={30} strokeWidth={1.5} />;

    const buttonElement =
        isUserSignedIn && isOpen ? (
            <button
                className={classes.button}
                disabled={isDisabled}
                onClick={handleShowMyAccount}
            >
                <Link to={mijnAccount}>{icon}</Link>
            </button>
        ) : (
            <button
                className={classes.button}
                disabled={isDisabled}
                onClick={handleSignIn}
            >
                <Link to={aanmelden}>{icon}</Link>
            </button>
        );

    return <div className={classes.root}>{buttonElement}</div>;
};

export default AuthBar;

AuthBar.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        button: string,
        button_open: string
    }),
    disabled: bool,
    showMyAccount: func.isRequired,
    showSignIn: func.isRequired
};
