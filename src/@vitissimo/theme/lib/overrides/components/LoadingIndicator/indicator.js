import React from 'react';

import { LoaderIcon } from '@vitissimo/theme/lib/components/Icons';
import classes from './indicator.css';

const LoadingIndicator = props => {
    const className = props.global ? classes.global : classes.root;

    return (
        <div className={className}>
            <LoaderIcon
                className={classes.indicator}
                color="#EC0008"
                size={64}
            />
            <span className={classes.message}>{props.children}</span>
        </div>
    );
};

export default LoadingIndicator;
