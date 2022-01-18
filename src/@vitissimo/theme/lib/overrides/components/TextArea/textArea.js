import React, { Fragment } from 'react';
import { number, node, oneOf, oneOfType, shape, string } from 'prop-types';
import { BasicTextArea, asField } from 'informed';
import { compose } from 'redux';

import { Message } from '@magento/venia-ui/lib/components/Field';

import classes from './textArea.css';

const TextArea = props => {
    const { fieldState, message, ...rest } = props;
    const inputClass = fieldState.error ? classes.input_error : classes.input;

    return (
        <Fragment>
            <BasicTextArea
                {...rest}
                fieldState={fieldState}
                className={inputClass}
            />
            <Message fieldState={fieldState}>{message}</Message>
        </Fragment>
    );
};

TextArea.propTypes = {
    classes: shape({
        input: string
    }),
    cols: oneOfType([number, string]),
    field: string.isRequired,
    fieldState: shape({
        value: string
    }),
    message: node,
    rows: oneOfType([number, string]),
    wrap: oneOf(['hard', 'soft'])
};

TextArea.defaultProps = {
    cols: 40,
    rows: 4,
    wrap: 'hard'
};

export default compose(asField)(TextArea);
