import React from 'react';
import { shape, string } from 'prop-types';

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    FastForwardIcon,
    RewindIcon
} from '@vitissimo/theme/lib/components/Icons';

import classes from './navButton.css';

const NavButton = props => {
    const { active, buttonLabel, name, onClick } = props;
    const iconClass = active ? classes.icon : classes.icon_disabled;

    const icons = new Map()
        .set(
            'ChevronLeft',
            <ChevronLeftIcon className={iconClass} strokeWidth={1} />
        )
        .set(
            'ChevronRight',
            <ChevronRightIcon className={iconClass} strokeWidth={1} />
        )
        .set(
            'FastForward',
            <FastForwardIcon
                className={iconClass}
                strokeWidth={1}
                fill="#EC0008"
            />
        )
        .set(
            'Rewind',
            <RewindIcon className={iconClass} strokeWidth={1} fill="#EC0008" />
        );

    const iconSrc = icons.get(name);

    return (
        <button
            aria-label={buttonLabel}
            className={classes.root}
            disabled={!active}
            onClick={onClick}
        >
            {iconSrc}
        </button>
    );
};

export default NavButton;

NavButton.propTypes = {
    classes: shape({
        icon: string,
        icon_disabled: string,
        root: string
    })
};

NavButton.defaultProps = {
    buttonLabel: 'move to another page'
};
