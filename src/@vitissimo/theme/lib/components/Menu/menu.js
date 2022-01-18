import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string } from 'prop-types';

import { Link, resourceUrl } from '@vitissimo/theme/lib/drivers';

import { useUserContext } from '@magento/peregrine/lib/context/user';
import MyClub from '@vitissimo/theme/lib/components/MyClub';

import classes from './menu.css';

const Menu = () => {
    const [{ isSignedIn }] = useUserContext();

    const teamwearUrl = resourceUrl('/teamwear');
    const contactUrl = resourceUrl('/contacteer-ons');

    const links = (
        <Fragment>
            {isSignedIn && (
                <li>
                    <MyClub />
                </li>
            )}
            <li>
                <Link to={teamwearUrl}>
                    <FormattedMessage
                        id={'global.teamwear'}
                        defaultMessage={'Teamwear'}
                    />
                </Link>
            </li>
            <li>
                <Link to={contactUrl}>
                    <FormattedMessage
                        id={'global.contact'}
                        defaultMessage={'Contact'}
                    />
                </Link>
            </li>
        </Fragment>
    );

    return <ul className={classes.root}>{links}</ul>;
};

Menu.propTypes = {
    classes: shape({
        root: string
    })
};

export default Menu;
