import React from 'react';

import {
    PeregrineContextProvider as Peregrine,
    ToastContextProvider,
    WindowSizeContextProvider
} from '@magento/peregrine';

import LocaleProvider from '@magento/venia-ui/lib/components/App/localeProvider';

const contextProviders = [
    LocaleProvider,
    Peregrine,
    WindowSizeContextProvider,
    ToastContextProvider
];

const ContextProvider = ({ children }) => {
    return contextProviders.reduceRight((memo, ContextProvider) => {
        return <ContextProvider>{memo}</ContextProvider>;
    }, children);
};

export default ContextProvider;
