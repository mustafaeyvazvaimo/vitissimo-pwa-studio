import React, { useCallback } from 'react';
import { bool, func, number, shape, string } from 'prop-types';

import classes from './tile.css';

const Tile = props => {
    const { isActive, number, onClick } = props;
    const rootClass = isActive ? classes.root_active : classes.root;
    const handleClick = useCallback(() => onClick(number), [onClick, number]);

    return (
        <button className={rootClass} onClick={handleClick}>
            {number}
        </button>
    );
};

Tile.propTypes = {
    classes: shape({
        root: string,
        root_active: string
    }),
    isActive: bool,
    number: number,
    onClick: func
};

export default Tile;
