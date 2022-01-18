import React, { Fragment } from 'react';
import { node, shape, string } from 'prop-types';
import { Radio as InformedRadio } from 'informed';

import { CircleIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './radio.css';
import { FormattedNumberParts } from 'react-intl';

const RadioOption = props => {
    const { id, label, value, ...rest } = props;

    return (
        <Fragment>
            <label className={classes.root} htmlFor={id}>
                <InformedRadio
                    {...rest}
                    className={classes.input}
                    id={id}
                    value={value}
                />
                <span className={classes.icon}>
                    <CircleIcon strokeWidth={1} color="#EC0008" />
                </span>
                <span className={classes.label}>
                    {label || (value != null ? value : '')}
                </span>
            </label>
        </Fragment>
    );
};

export default RadioOption;

RadioOption.propTypes = {
    classes: shape({
        icon: string,
        input: string,
        label: string,
        root: string
    }),
    id: string.isRequired,
    label: node.isRequired,
    value: node.isRequired
};

/* eslint-enable jsx-a11y/label-has-for */
