import React from 'react';
import { FormattedMessage } from 'react-intl';
import { func, shape, string } from 'prop-types';

import { Link } from '@vitissimo/theme/lib/drivers';
import { useSuggestedCategory } from '@magento/peregrine/lib/talons/SearchBar';

import classes from './suggestedCategory.css';

const SuggestedCategory = props => {
    const { categoryId, label, onNavigate, value } = props;
    const talonProps = useSuggestedCategory({
        categoryId,
        label,
        onNavigate,
        searchValue: value
    });
    const { destination, handleClick } = talonProps;

    return (
        <div className={classes.hover}>
            <Link
                className={classes.root}
                to={destination}
                onClick={handleClick}
            >
                <strong className={classes.value}>{value}</strong>
                <span className={classes.label}>
                    <FormattedMessage
                        id={'searchBar.label'}
                        defaultMessage={' in category '}
                        values={{
                            label
                        }}
                    />
                    <span className={classes.categoryName}>{label}</span>
                </span>
            </Link>
        </div>
    );
};

export default SuggestedCategory;

SuggestedCategory.propTypes = {
    categoryId: string,
    classes: shape({
        label: string,
        root: string,
        value: string
    }),
    label: string.isRequired,
    onNavigate: func,
    value: string.isRequired
};
