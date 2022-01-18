import React from 'react';
import { bool, shape, string } from 'prop-types';
import { Form } from 'informed';

import { useSearchBar } from '@magento/peregrine/lib/talons/SearchBar';

import Autocomplete from './autocomplete';
import SearchField from './searchField';

import classes from './searchBar.css';

const SearchBar = React.forwardRef((props, ref) => {
    const { isOpen } = props;
    const talonProps = useSearchBar();
    const {
        containerRef,
        handleChange,
        handleSubmit,
        initialValues,
        isAutoCompleteOpen,
        setIsAutoCompleteOpen,
        valid
    } = talonProps;

    const rootClassName = isOpen ? classes.root_open : classes.root;

    return (
        <div className={rootClassName} ref={ref}>
            <div ref={containerRef} className={classes.container}>
                <Form
                    autoComplete="off"
                    className={classes.form}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <div className={classes.autocomplete}>
                        <Autocomplete
                            setVisible={setIsAutoCompleteOpen}
                            valid={valid}
                            visible={isAutoCompleteOpen}
                        />
                    </div>
                    <div className={classes.search}>
                        <SearchField
                            isSearchOpen={!isOpen}
                            onChange={handleChange}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
});

export default SearchBar;

SearchBar.propTypes = {
    classes: shape({
        autocomplete: string,
        container: string,
        form: string,
        root: string,
        root_open: string,
        search: string
    }),
    isOpen: bool
};
