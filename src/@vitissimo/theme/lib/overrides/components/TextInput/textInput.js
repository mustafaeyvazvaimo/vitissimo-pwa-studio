import React, { Fragment } from 'react';
import { node, number, oneOfType, shape, string } from 'prop-types';
import { BasicText, asField } from 'informed';
import { compose } from 'redux';

import { FieldIcons, Message } from '@magento/venia-ui/lib/components/Field';

import classes from './textInput.css';

const TextInput = props => {
    const { after, before, fieldState, message, ...rest } = props;

    const inputClass = fieldState.error ? classes.input_error : classes.input;

    return (
        <Fragment>
            <FieldIcons after={after} before={before}>
                <BasicText
                    {...rest}
                    fieldState={fieldState}
                    className={inputClass}
                />
            </FieldIcons>
            <Message fieldState={fieldState}>{message}</Message>
        </Fragment>
    );
};

TextInput.propTypes = {
    after: node,
    before: node,
    classes: shape({
        input: string
    }),
    fieldState: shape({
        value: oneOfType([string, number])
    }),
    message: node
};

export default compose(asField)(TextInput);
