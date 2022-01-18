import React from 'react';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';

import { useSearchTrigger } from '@magento/peregrine/lib/talons/Header/useSearchTrigger';

import { SearchIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './searchTrigger.css';

const SearchTrigger = React.forwardRef((props, ref) => {
    const { active, onClick } = props;

    const talonProps = useSearchTrigger({
        onClick
    });
    const { handleClick } = talonProps;
    const { formatMessage } = useIntl();

    const searchClass = active ? classes.open : classes.root;

    return (
        <button className={searchClass} onClick={handleClick} ref={ref}>
            <SearchIcon color="#000000" size={28} />
        </button>
    );
});

SearchTrigger.propTypes = {
    classes: shape({
        root: string,
        open: string
    })
};

export default SearchTrigger;
