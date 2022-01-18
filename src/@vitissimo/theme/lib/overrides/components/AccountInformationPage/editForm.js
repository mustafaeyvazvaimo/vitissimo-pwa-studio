import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shape, string } from 'prop-types';

import Field from '@magento/venia-ui/lib/components/Field';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import Password from '@magento/venia-ui/lib/components/Password';
import TextInput from '@magento/venia-ui/lib/components/TextInput';

import {
    isRequired,
    hasLengthAtLeast,
    validatePassword,
    isEqualToField,
    isNotEqualToField
} from '@magento/venia-ui/lib/util/formValidators';
import combine from '@magento/venia-ui/lib/util/combineValidators';

import classes from './editForm.css';

const EditForm = props => {
    const { handleChangePassword, shouldShowNewPassword } = props;
    const { formatMessage } = useIntl();

    const maybeNewPasswordField = shouldShowNewPassword ? (
        <div className={classes.newPassword}>
            <Password
                fieldName="newPassword"
                label={formatMessage({
                    id: 'global.newPassword',
                    defaultMessage: 'New Password'
                })}
                validate={combine([
                    isRequired,
                    [hasLengthAtLeast, 8],
                    validatePassword,
                    [isNotEqualToField, 'password']
                ])}
                isToggleButtonHidden={false}
            />
            <Password
                fieldName="confirmPassword"
                label={formatMessage({
                    id: 'createAccount.passwordRepeatText',
                    defaultMessage: 'Bevestig wachtwoord'
                })}
                validate={combine([
                    isRequired,
                    [hasLengthAtLeast, 8],
                    validatePassword,
                    [isEqualToField, 'newPassword']
                ])}
                isToggleButtonHidden={false}
            />
        </div>
    ) : null;

    const maybeChangePasswordButton = !shouldShowNewPassword ? (
        <div className={classes.changePasswordButtonContainer}>
            <LinkButton
                classes={classes.changePasswordButton}
                type="button"
                onClick={handleChangePassword}
            >
                <FormattedMessage
                    id={'global.changePassword'}
                    defaultMessage={'Change Password'}
                />
            </LinkButton>
        </div>
    ) : null;

    const passwordLabel = shouldShowNewPassword
        ? formatMessage({
              id: 'global.currentPassword',
              defaultMessage: 'Current Password'
          })
        : formatMessage({
              id: 'global.password',
              defaultMessage: 'Password'
          });
          
    return (
        <Fragment>
            <div className={classes.root}>
                <div className={classes.firstname}>
                    <Field
                        id="firstname"
                        label={formatMessage({
                            id: 'global.firstName',
                            defaultMessage: 'First Name'
                        })}
                    >
                        <TextInput field="firstname" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.lastname}>
                    <Field
                        id="lastname"
                        label={formatMessage({
                            id: 'global.lastName',
                            defaultMessage: 'Last Name'
                        })}
                    >
                        <TextInput field="lastname" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.email}>
                    <Field
                        id="email"
                        label={formatMessage({
                            id: 'global.email',
                            defaultMessage: 'Email'
                        })}
                    >
                        <TextInput field="email" validate={isRequired} />
                    </Field>
                </div>
                <div className={classes.password}>
                    <Password
                        fieldName="password"
                        label={passwordLabel}
                        validate={isRequired}
                        autoComplete="current-password"
                        isToggleButtonHidden={false}
                    />
                </div>
                {maybeNewPasswordField}
            </div>
            {maybeChangePasswordButton}
        </Fragment>
    );
};

export default EditForm;

EditForm.propTypes = {
    classes: shape({
        changePasswordButton: string,
        changePasswordButtonContainer: string,
        root: string,
        field: string,
        email: string,
        firstname: string,
        lastname: string,
        buttons: string,
        passwordLabel: string,
        password: string,
        newPassword: string
    })
};
