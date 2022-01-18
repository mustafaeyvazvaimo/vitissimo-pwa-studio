import React, { Fragment } from 'react';
import { bool, node, shape, string } from 'prop-types';
import { BasicCheckbox, asField } from 'informed';
import { compose } from 'redux';

import { Message } from '@magento/venia-ui/lib/components/Field';

import {
    CheckBoxIcon,
    CheckedBoxIcon
} from '@vitissimo/theme/lib/components/Icons';

import classes from './checkbox.css';

export const Checkbox = props => {
    const { fieldState, id, label, message, ...rest } = props;
    const { value: checked } = fieldState;

    const icon = checked ? (
        <CheckedBoxIcon color="#EC0008" size={20} strokeWidth={1} />
    ) : (
        <CheckBoxIcon color="#EC0008" size={20} strokeWidth={1} />
    );

    return (
        <Fragment>
            <label className={classes.root} htmlFor={id}>
                <BasicCheckbox
                    {...rest}
                    className={classes.input}
                    fieldState={fieldState}
                    id={id}
                />
                <span className={classes.icon}>{icon}</span>
                <span className={classes.label}>{label}</span>
            </label>
            <Message fieldState={fieldState}>{message}</Message>
        </Fragment>
    );
};

Checkbox.propTypes = {
    classes: shape({
        icon: string,
        input: string,
        label: string,
        message: string,
        root: string
    }),
    field: string.isRequired,
    fieldState: shape({
        value: bool
    }).isRequired,
    id: string,
    label: node.isRequired,
    message: node
};

export default compose(asField)(Checkbox);
