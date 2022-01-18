import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { func, shape, string, bool, oneOf } from 'prop-types';

import { Redirect } from '@vitissimo/theme/lib/drivers';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import {
    hasLengthAtLeast,
    isRequired,
    validatePassword,
    isEqualToField
} from '@magento/venia-ui/lib/util/formValidators';
import { useCreateAccount } from '@magento/peregrine/lib/talons/CreateAccount/useCreateAccount';

import Button from '@magento/venia-ui/lib/components/Button';
import Checkbox from '@magento/venia-ui/lib/components/Checkbox';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import FormError from '@magento/venia-ui/lib/components/FormError';
import Password from '@magento/venia-ui/lib/components/Password';

import classes from './createAccount.css';

const CreateAccount = props => {
    const talonProps = useCreateAccount({
        initialValues: props.initialValues,
        onSubmit: props.onSubmit,
        onCancel: props.onCancel
    });

    const {
        errors,
        handleCancel,
        handleSubmit,
        isDisabled,
        isSignedIn,
        initialValues
    } = talonProps;
    const { formatMessage } = useIntl();

    if (isSignedIn) {
        return <Redirect to="/" />;
    }

    const cancelButton = props.isCancelButtonHidden ? null : (
        <Button
            className={classes.cancelButton}
            disabled={isDisabled}
            type="button"
            priority="low"
            onClick={handleCancel}
        >
            <FormattedMessage
                id={'createAccount.cancelText'}
                defaultMessage={'Cancel'}
            />
        </Button>
    );

    const submitButton = (
        <Button
            className={classes.submitButton}
            disabled={isDisabled}
            type="submit"
            priority="high"
        >
            <FormattedMessage
                id={'createAccount.createAccountText'}
                defaultMessage={'Create an Account'}
            />
        </Button>
    );

    return (
        <Form
            className={classes.root}
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <h2 className={classes.title}>
                <FormattedMessage
                    id={'createAccount.createAccountText'}
                    defaultMessage={'Create an Account'}
                />
            </h2>
            <FormError errors={Array.from(errors.values())} />
            <Field
                label={formatMessage({
                    id: 'createAccount.firstNameText',
                    defaultMessage: 'First Name'
                })}
            >
                <TextInput
                    field="customer.firstname"
                    autoComplete="given-name"
                    validate={isRequired}
                    validateOnBlur
                    mask={value => value && value.trim()}
                    maskOnBlur={true}
                />
            </Field>
            <Field
                label={formatMessage({
                    id: 'createAccount.lastNameText',
                    defaultMessage: 'Last Name'
                })}
            >
                <TextInput
                    field="customer.lastname"
                    autoComplete="family-name"
                    validate={isRequired}
                    validateOnBlur
                    mask={value => value && value.trim()}
                    maskOnBlur={true}
                />
            </Field>
            <Field
                label={formatMessage({
                    id: 'createAccount.emailText',
                    defaultMessage: 'Email'
                })}
            >
                <TextInput
                    field="customer.email"
                    autoComplete="email"
                    validate={isRequired}
                    validateOnBlur
                    mask={value => value && value.trim()}
                    maskOnBlur={true}
                />
            </Field>
            <Password
                autoComplete="new-password"
                fieldName="password"
                isToggleButtonHidden={false}
                label={formatMessage({
                    id: 'createAccount.passwordText',
                    defaultMessage: 'Password'
                })}
                validate={combine([
                    isRequired,
                    [hasLengthAtLeast, 8],
                    validatePassword
                ])}
                validateOnBlur
                mask={value => value && value.trim()}
                maskOnBlur={true}
            />
            <Password
                autoComplete="new-password"
                fieldName="confirmPassword"
                isToggleButtonHidden={false}
                label={formatMessage({
                    id: 'createAccount.passwordRepeatText',
                    defaultMessage: 'Bevestig wachtwoord'
                })}
                validate={combine([
                    isRequired,
                    [hasLengthAtLeast, 8],
                    validatePassword,
                    [isEqualToField, 'password']
                ])}
                validateOnBlur
                mask={value => value && value.trim()}
                maskOnBlur={true}
            />
            <div className={classes.subscribe}>
                <Checkbox
                    field="subscribe"
                    label={formatMessage({
                        id: 'createAccount.subscribeText',
                        defaultMessage: 'Subscribe to news and updates'
                    })}
                />
            </div>
            <div className={classes.actions}>
                {submitButton}
                {cancelButton}
            </div>
        </Form>
    );
};

CreateAccount.propTypes = {
    classes: shape({
        actions: string,
        lead: string,
        root: string,
        subscribe: string
    }),
    initialValues: shape({
        email: string,
        firstName: string,
        lastName: string
    }),
    isCancelButtonHidden: bool,
    onSubmit: func,
    onCancel: func
};

CreateAccount.defaultProps = {
    onCancel: () => {},
    isCancelButtonHidden: true
};

export default CreateAccount;
