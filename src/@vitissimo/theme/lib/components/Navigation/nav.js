import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string } from 'prop-types';

import { Link, resourceUrl } from '@vitissimo/theme/lib/drivers';

import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useCustomerGroup } from '@vitissimo/theme/lib/hooks/CustomerGroup/useCustomerGroup';
import { useNav } from './useNav';

import classes from './nav.css';
import MyClub from '../MyClub';

const Nav = () => {
    const [{ isSignedIn }] = useUserContext();
    const { handleClose, isOpen } = useNav();

    const teamwearUrl = resourceUrl('/teamwear');
    const contactUrl = resourceUrl('/contacteer-ons');

    const links = isOpen ? (
        <Fragment>
            {isSignedIn && (
                <li className={classes.root}>
                    <MyClub isNav classes={classes} handleClose={handleClose} />
                </li>
            )}
            <li className={classes.root}>
                <Link
                    className={classes.target}
                    to={teamwearUrl}
                    onClick={handleClose}
                >
                    <span className={classes.text}>
                        <FormattedMessage
                            id={'global.teamwear'}
                            defaultMessage={'Teamwear'}
                        />
                    </span>
                </Link>
            </li>
            <li className={classes.root}>
                <Link
                    className={classes.target}
                    to={contactUrl}
                    onClick={handleClose}
                >
                    <span className={classes.text}>
                        <FormattedMessage
                            id={'global.contact'}
                            defaultMessage={'Contact'}
                        />
                    </span>
                </Link>
            </li>
        </Fragment>
    ) : null;

    return (
        <Fragment>
            <div className={classes.divider} />
            {links}
        </Fragment>
    );
};

Nav.propTypes = {
    classes: shape({
        root: string,
        target: string,
        text: string,
        divider: string
    })
};

export default Nav;
