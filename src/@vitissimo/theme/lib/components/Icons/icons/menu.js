import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Menu = forwardRef(
    (
        {
            color = 'currentColor',
            size = 24,
            strokeWidth = 2,
            fill = 'none',
            ...rest
        },
        ref
    ) => {
        return (
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={fill}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...rest}
            >
                <line x1="6" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="18" y2="6" />
                <line x1="3" y1="18" x2="18" y2="18" />
            </svg>
        );
    }
);

Menu.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Menu.displayName = 'MenuIcon';

export default Menu;
