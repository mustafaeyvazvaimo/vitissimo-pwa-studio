import React from 'react';
import { node, shape, string } from 'prop-types';
import { useIntl } from 'react-intl';

import { useNavigationTrigger } from '@magento/peregrine/lib/talons/Header/useNavigationTrigger';

import { MenuIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './navTrigger.css';

const NavigationTrigger = () => {
    const { formatMessage } = useIntl();
    const { handleOpenNavigation } = useNavigationTrigger();

    return (
        <button
            className={classes.root}
            aria-label={formatMessage({
                id: 'navigationTrigger.ariaLabel',
                defaultMessage: 'Toggle navigation panel'
            })}
            onClick={handleOpenNavigation}
        >
            <MenuIcon strokeWidth={2.3} />
        </button>
    );
};

NavigationTrigger.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default NavigationTrigger;
