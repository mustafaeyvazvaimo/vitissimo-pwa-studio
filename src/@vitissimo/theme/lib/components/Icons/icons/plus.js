import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Plus = forwardRef(
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
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        );
    }
);

Plus.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Plus.displayName = 'PlusIcon';

export default Plus;
