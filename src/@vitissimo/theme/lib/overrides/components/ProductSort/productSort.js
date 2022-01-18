import React, { useMemo, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { array, arrayOf, shape, string, oneOf } from 'prop-types';

import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

import SortItem from '@magento/venia-ui/lib/components/ProductSort/sortItem';
import Button from '@magento/venia-ui/lib/components/Button';

import classes from './productSort.css';

const ProductSort = props => {
    const intl = useIntl();
    const { availableSortMethods, sortProps } = props;
    const [currentSort, setSort] = sortProps;
    const { elementRef, expanded, setExpanded } = useDropdown();

    // click event for menu items
    const handleItemClick = useCallback(
        sortAttribute => {
            setSort({
                sortText: intl.formatMessage({ id: sortAttribute.id }),
                sortId: sortAttribute.id,
                sortAttribute: sortAttribute.attribute,
                sortDirection: sortAttribute.sortDirection
            });
            setExpanded(false);
        },
        [setExpanded, setSort]
    );

    const sortElements = useMemo(() => {
        // should be not render item in collapsed mode.
        if (!expanded) {
            return null;
        }

        const itemElements = Array.from(availableSortMethods, sortItem => {
            const { attribute, sortDirection } = sortItem;
            const isActive =
                currentSort.sortAttribute === attribute &&
                currentSort.sortDirection === sortDirection;

            const key = `${attribute}--${sortDirection}`;
            return (
                <li key={key} className={classes.menuItem}>
                    <SortItem
                        sortItem={sortItem}
                        active={isActive}
                        onClick={handleItemClick}
                    />
                </li>
            );
        });

        return (
            <div className={classes.menu}>
                <ul>{itemElements}</ul>
            </div>
        );
    }, [
        availableSortMethods,
        classes.menu,
        classes.menuItem,
        currentSort.sortAttribute,
        currentSort.sortDirection,
        expanded,
        handleItemClick
    ]);

    // expand or collapse on click
    const handleSortClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div ref={elementRef} className={classes.root}>
            <Button
                priority={'low'}
                classes={{
                    root_lowPriority: classes.sortButton
                }}
                onClick={handleSortClick}
            >
                <span className={classes.mobileText}>
                    <FormattedMessage
                        id={'productSort.sortButton'}
                        defaultMessage={'Sort'}
                    />
                </span>
                <span className={classes.desktopText}>
                    <span className={classes.sortText}>
                        <FormattedMessage
                            id={'productSort.sortByButton'}
                            defaultMessage={'Sort by'}
                        />
                        &nbsp;
                        <FormattedMessage id={currentSort.sortId} />
                    </span>
                </span>
            </Button>
            {sortElements}
        </div>
    );
};

const sortDirections = oneOf(['ASC', 'DESC']);

ProductSort.propTypes = {
    classes: shape({
        menuItem: string,
        menu: string,
        root: string,
        sortButton: string
    }),
    availableSortMethods: arrayOf(
        shape({
            text: string,
            id: string,
            attribute: string,
            sortDirection: sortDirections
        })
    ),
    sortProps: array
};

ProductSort.defaultProps = {
    availableSortMethods: [
        {
            text: 'sortItem.position',
            id: 'sortItem.position',
            attribute: 'position',
            sortDirection: 'ASC'
        },
        {
            id: 'sortItem.relevance',
            text: 'sortItem.relevance',
            attribute: 'relevance',
            sortDirection: 'DESC'
        },
        {
            id: 'sortItem.priceAsc',
            text: 'sortItem.priceAsc',
            attribute: 'price',
            sortDirection: 'ASC'
        },
        {
            id: 'sortItem.priceDesc',
            text: 'sortItem.priceDesc',
            attribute: 'price',
            sortDirection: 'DESC'
        }
    ]
};

export default ProductSort;
