import React from 'react';
import { FormattedMessage } from 'react-intl';
import { bool, func, shape, string, object, node } from 'prop-types';
import { Form } from 'informed';

import { useScrollLock } from '@magento/peregrine';

import Button from '@magento/venia-ui/lib/components/Button';
import { Portal } from '@magento/venia-ui/lib/components/Portal';

import { CloseIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './dialog.css';

const Dialog = props => {
    const {
        cancelText,
        cancelTranslationId,
        children,
        confirmText,
        confirmTranslationId,
        formProps,
        isModal,
        isOpen,
        onCancel,
        onConfirm,
        shouldDisableAllButtons,
        shouldDisableConfirmButton,
        shouldShowButtons = true,
        shouldUnmountOnHide,
        title
    } = props;

    // Prevent the page from scrolling in the background
    // when the Dialog is open.
    useScrollLock(isOpen);

    const rootClass = isOpen ? classes.root_open : classes.root;
    const isMaskDisabled = shouldDisableAllButtons || isModal;
    const confirmButtonDisabled =
        shouldDisableAllButtons || shouldDisableConfirmButton;

    const cancelButtonClasses = {
        root_lowPriority: classes.cancelButton
    };
    const confirmButtonClasses = {
        root_highPriority: classes.confirmButton
    };

    const maybeCloseXButton = !isModal ? (
        <button
            className={classes.headerButton}
            disabled={shouldDisableAllButtons}
            onClick={onCancel}
            type="reset"
        >
            <CloseIcon color="#EC0008" />
        </button>
    ) : null;

    const maybeButtons = shouldShowButtons ? (
        <div className={classes.buttons}>
            <Button
                classes={cancelButtonClasses}
                disabled={shouldDisableAllButtons}
                onClick={onCancel}
                priority="low"
                type="reset"
            >
                <FormattedMessage
                    id={cancelTranslationId}
                    defaultMessage={cancelText}
                />
            </Button>
            <Button
                classes={confirmButtonClasses}
                disabled={confirmButtonDisabled}
                priority="high"
                type="submit"
            >
                <FormattedMessage
                    id={confirmTranslationId}
                    defaultMessage={confirmText}
                />
            </Button>
        </div>
    ) : null;

    const maybeForm =
        isOpen || !shouldUnmountOnHide ? (
            <Form className={classes.form} {...formProps} onSubmit={onConfirm}>
                {/* The Mask. */}
                <button
                    className={classes.mask}
                    disabled={isMaskDisabled}
                    onClick={onCancel}
                    type="reset"
                />
                {/* The Dialog. */}
                <div className={classes.dialog}>
                    <div className={classes.header}>
                        <span className={classes.headerText}>{title}</span>
                        {maybeCloseXButton}
                    </div>
                    <div className={classes.body}>
                        <div className={classes.contents}>{children}</div>
                        {maybeButtons}
                    </div>
                </div>
            </Form>
        ) : null;

    return (
        <Portal>
            <aside className={rootClass}>{maybeForm}</aside>
        </Portal>
    );
};

export default Dialog;

Dialog.propTypes = {
    cancelText: string,
    cancelTranslationId: string,
    classes: shape({
        body: string,
        cancelButton: string,
        confirmButton: string,
        container: string,
        contents: string,
        header: string,
        headerText: string,
        headerButton: string,
        mask: string,
        root: string,
        root_open: string
    }),
    confirmText: string,
    confirmTranslationId: string,
    formProps: object,
    isModal: bool,
    isOpen: bool,
    onCancel: func,
    onConfirm: func,
    shouldDisableAllButtons: bool,
    shouldDisableSubmitButton: bool,
    shouldUnmountOnHide: bool,
    title: node
};

Dialog.defaultProps = {
    cancelText: 'Cancel',
    cancelTranslationId: 'global.cancelButton',
    confirmText: 'Confirm',
    confirmTranslationId: 'global.confirmButton',
    isModal: false,
    shouldUnmountOnHide: true
};
