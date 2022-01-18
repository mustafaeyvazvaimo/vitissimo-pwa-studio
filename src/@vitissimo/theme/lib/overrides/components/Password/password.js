import React from 'react';
import { string, bool, shape, func } from 'prop-types';

import { usePassword } from '@magento/peregrine/lib/talons/Password/usePassword';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';

import Button from '@magento/venia-ui/lib/components/Button';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';

import { EyeIcon, EyeOffIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './password.css';

const Password = props => {
    const {
        classes: propClasses,
        label,
        fieldName,
        isToggleButtonHidden,
        autoComplete,
        validate,
        ...otherProps
    } = props;

    const talonProps = usePassword();
    const { handleBlur, togglePasswordVisibility, visible } = talonProps;

    const passwordButton = (
        <Button
            className={classes.passwordButton}
            onClick={togglePasswordVisibility}
            type="button"
        >
            {visible ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
        </Button>
    );

    const fieldType = visible ? 'text' : 'password';

    return (
        <Field label={label} classes={{ root: classes.root }}>
            <TextInput
                after={!isToggleButtonHidden && passwordButton}
                autoComplete={autoComplete}
                field={fieldName}
                type={fieldType}
                validate={validate}
                onBlur={handleBlur}
                {...otherProps}
            />
        </Field>
    );
};

Password.propTypes = {
    autoComplete: string,
    classes: shape({
        root: string
    }),
    label: string,
    fieldName: string,
    isToggleButtonHidden: bool,
    validate: func
};

Password.defaultProps = {
    isToggleButtonHidden: true,
    validate: isRequired
};

export default Password;
