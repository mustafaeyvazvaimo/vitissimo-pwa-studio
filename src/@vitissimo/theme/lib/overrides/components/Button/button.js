import React from 'react';
import { oneOf, shape, string, bool } from 'prop-types';

import classes from './button.css';

const getRootClassName = (priority, negative) =>
    `root_${priority}Priority${negative ? 'Negative' : ''}`;

const Button = props => {
    const {
        children,
        classes: propClasses,
        priority,
        type,
        negative,
        disabled,
        ...restProps
    } = props;

    const rootClassName = classes[getRootClassName(priority, negative)];

    return (
        <button
            className={rootClassName}
            type={type}
            disabled={disabled}
            {...restProps}
        >
            <span className={classes.content}>{children}</span>
        </button>
    );
};

Button.propTypes = {
    classes: shape({
        content: string,
        root: string,
        root_highPriority: string,
        root_lowPriority: string,
        root_normalPriority: string
    }),
    priority: oneOf(['high', 'low', 'normal']).isRequired,
    type: oneOf(['button', 'reset', 'submit']).isRequired,
    negative: bool,
    disabled: bool
};

Button.defaultProps = {
    priority: 'normal',
    type: 'button',
    negative: false,
    disabled: false
};

export default Button;
