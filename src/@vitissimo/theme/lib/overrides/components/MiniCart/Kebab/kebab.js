import React from 'react';
import { node, shape, string } from 'prop-types';

import { useKebab } from '@magento/peregrine/lib/talons/LegacyMiniCart/useKebab';

import { MoreVerticalIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './kebab.css';

const Kebab = props => {
    const { handleKebabClick, isOpen, kebabRef } = useKebab();
    const { children } = props;
    const toggleClass = isOpen ? classes.dropdown_active : classes.dropdown;

    return (
        <div className={classes.root}>
            <button
                className={classes.kebab}
                onClick={handleKebabClick}
                ref={kebabRef}
            >
                <MoreVerticalIcon fill="#EC0008" />
            </button>
            <ul className={toggleClass}>{children}</ul>
        </div>
    );
};

Kebab.propTypes = {
    children: node,
    classes: shape({
        dropdown: string,
        dropdown_active: string,
        kebab: string,
        root: string
    })
};

export default Kebab;
