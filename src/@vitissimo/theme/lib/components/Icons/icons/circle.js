import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Circle = forwardRef(
    ({ color = 'currentColor', size = 24, strokeWidth = 2, fill = 'none', ...rest }, ref) => {
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
                <circle cx="12" cy="12" r="10" />
            </svg>
        );
    }
);

Circle.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Circle.displayName = 'CircleIcon';

export default Circle;
