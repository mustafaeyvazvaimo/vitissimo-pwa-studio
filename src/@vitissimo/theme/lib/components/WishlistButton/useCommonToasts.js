import React, { useEffect } from 'react';
import { useToasts } from '@magento/peregrine';

import {
    AlertCircleIcon,
    CheckIcon,
    InfoIcon
} from '@vitissimo/theme/lib/components/Icons';

const checkIcon = <CheckIcon size={20} />;
const errorIcon = <AlertCircleIcon size={20} />;
const infoIcon = <InfoIcon size={20} />;

export const useCommonToasts = props => {
    const { errorToastProps, loginToastProps, successToastProps } = props;

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (loginToastProps) {
            addToast({ ...loginToastProps, icon: infoIcon });
        }
    }, [addToast, loginToastProps]);

    useEffect(() => {
        if (successToastProps) {
            addToast({ ...successToastProps, icon: checkIcon });
        }
    }, [addToast, successToastProps]);

    useEffect(() => {
        if (errorToastProps) {
            addToast({ ...errorToastProps, icon: errorIcon });
        }
    }, [addToast, errorToastProps]);
};
