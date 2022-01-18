import React from 'react';
import { func } from 'prop-types';
import { useSearchField } from '@magento/peregrine/lib/talons/SearchBar';

import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Trigger from '@magento/venia-ui/lib/components/Trigger';

import { SearchIcon, CloseIcon } from '../../../components/Icons';

const clearIcon = <CloseIcon size={20} />;
const searchIcon = <SearchIcon color="#000000" size={20} />;

const SearchField = props => {
    const { isSearchOpen, onChange, onFocus } = props;
    const { inputRef, resetForm, value } = useSearchField({ isSearchOpen });

    const resetButton = value ? (
        <Trigger action={resetForm}>{clearIcon}</Trigger>
    ) : (
        <SearchIcon size={20} />
    );

    return (
        <TextInput
            after={resetButton}
            field="search_query"
            onFocus={onFocus}
            onValueChange={onChange}
            forwardedRef={inputRef}
            placeholder="Zoek naar een product"
        />
    );
};

export default SearchField;

SearchField.propTypes = {
    onChange: func,
    onFocus: func
};
