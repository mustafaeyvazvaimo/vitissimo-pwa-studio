import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const PlusSquare = forwardRef(
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
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
        );
    }
);

PlusSquare.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

PlusSquare.displayName = 'PlusSquareIcon';

export default PlusSquare;
