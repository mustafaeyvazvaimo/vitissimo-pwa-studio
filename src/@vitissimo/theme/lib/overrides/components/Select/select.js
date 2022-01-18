import React, { Fragment } from 'react';
import { arrayOf, node, number, oneOfType, shape, string } from 'prop-types';
import {
    Option as InformedOption,
    Select as InformedSelect,
    useFieldState
} from 'informed';

import { FieldIcons, Message } from '@magento/venia-ui/lib/components/Field';

import { ChevronDownIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './select.css';

const arrow = <ChevronDownIcon color="#EC0008" />;

const Select = props => {
    const { before, field, items, message, ...rest } = props;
    const fieldState = useFieldState(field);
    const inputClass = fieldState.error ? classes.input_error : classes.input;

    const options = items.map(
        ({ disabled = null, hidden = null, label, value, key = value }) => (
            <InformedOption
                key={key}
                disabled={disabled}
                hidden={hidden}
                value={value}
            >
                {label || (value != null ? value : '')}
            </InformedOption>
        )
    );

    return (
        <Fragment>
            <FieldIcons after={arrow} before={before}>
                <InformedSelect {...rest} className={inputClass} field={field}>
                    {options}
                </InformedSelect>
            </FieldIcons>
            <Message fieldState={fieldState}>{message}</Message>
        </Fragment>
    );
};

export default Select;

Select.propTypes = {
    before: node,
    classes: shape({
        input: string
    }),
    field: string.isRequired,
    items: arrayOf(
        shape({
            key: oneOfType([number, string]),
            label: string,
            value: oneOfType([number, string])
        })
    ),
    message: node
};
