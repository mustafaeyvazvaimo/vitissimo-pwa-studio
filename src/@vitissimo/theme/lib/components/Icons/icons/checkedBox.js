import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const CheckedBox = forwardRef(
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
                <polyline points="9 10 12 16 24 1" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
        );
    }
);

CheckedBox.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

CheckedBox.displayName = 'CheckedBoxIcon';

export default CheckedBox;
