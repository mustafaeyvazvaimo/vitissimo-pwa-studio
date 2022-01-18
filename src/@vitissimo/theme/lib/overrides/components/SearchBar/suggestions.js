import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import { useSuggestions } from '@magento/peregrine/lib/talons/SearchBar';

import SuggestedCategories from '@magento/venia-ui/lib/components/SearchBar/suggestedCategories';
import SuggestedProducts from '@magento/venia-ui/lib/components/SearchBar/suggestedProducts';

import classes from './suggestions.css';

const Suggestions = props => {
    const {
        displayResult,
        filters,
        products,
        searchValue,
        setVisible,
        visible
    } = props;
    const { items } = products;

    const talonProps = useSuggestions({
        displayResult,
        filters,
        items,
        setVisible,
        visible
    });
    const { categories, onNavigate, shouldRender } = talonProps;

    // render null without data
    if (!shouldRender) {
        return null;
    }

    return (
        <Fragment>
            <SuggestedCategories
                categories={categories}
                onNavigate={onNavigate}
                value={searchValue}
            />
            <h2 className={classes.heading}>
                <span>
                    <FormattedMessage
                        id={'searchBar.heading'}
                        defaultMessage={'Product Suggestions'}
                    />
                </span>
            </h2>
            <SuggestedProducts onNavigate={onNavigate} products={items} />
        </Fragment>
    );
};

export default Suggestions;

Suggestions.propTypes = {
    classes: shape({
        heading: string
    }),
    products: shape({
        filters: arrayOf(
            shape({
                filter_items: arrayOf(shape({})),
                name: string.isRequired
            }).isRequired
        ),
        items: arrayOf(shape({}))
    }),
    searchValue: string,
    setVisible: func,
    visible: bool
};
