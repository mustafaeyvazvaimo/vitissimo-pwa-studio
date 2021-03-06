import React from 'react';
import { arrayOf, shape, string, func, bool } from 'prop-types';
import { useIntl } from 'react-intl';
import { Form } from 'informed';

import { useFilterBlock } from '@magento/peregrine/lib/talons/FilterModal';
import setValidator from '@magento/peregrine/lib/validators/set';

import FilterList from '@magento/venia-ui/lib/components/FilterModal/FilterList';

import {
    ChevronDownIcon,
    ChevronUpIcon
} from '@vitissimo/theme/lib/components/Icons';

import classes from './filterBlock.css';

const FilterBlock = props => {
    const {
        filterApi,
        filterState,
        group,
        items,
        name,
        onApply,
        initialOpen
    } = props;

    const { formatMessage } = useIntl();
    const talonProps = useFilterBlock({
        filterState,
        items,
        initialOpen
    });
    const { handleClick, isExpanded } = talonProps;
    const iconSrc = isExpanded ? (
        <ChevronUpIcon color="#EC0008" />
    ) : (
        <ChevronDownIcon />
    );
    const listClass = isExpanded
        ? classes.list_expanded
        : classes.list_collapsed;

    const itemAriaLabel = formatMessage(
        {
            id: 'filterModal.item.ariaLabel',
            defaultMessage: 'Filter products by'
        },
        {
            itemName: name
        }
    );

    const toggleItemOptionsAriaLabel = isExpanded
        ? formatMessage(
              {
                  id: 'filterModal.item.hideOptions',
                  defaultMessage: 'Hide filter item options.'
              },
              {
                  itemName: name
              }
          )
        : formatMessage(
              {
                  id: 'filterModal.item.showOptions',
                  defaultMessage: 'Show filter item options.'
              },
              {
                  itemName: name
              }
          );

    return (
        <li className={classes.root} ariaLabel={itemAriaLabel}>
            <button
                className={classes.trigger}
                onClick={handleClick}
                type="button"
                aria-expanded={isExpanded}
                aria-label={toggleItemOptionsAriaLabel}
            >
                <span className={classes.header}>
                    <span className={classes.name}>{name}</span>
                    {iconSrc}
                </span>
            </button>
            <Form className={listClass}>
                <FilterList
                    filterApi={filterApi}
                    filterState={filterState}
                    group={group}
                    items={items}
                    onApply={onApply}
                    isExpanded={isExpanded}
                />
            </Form>
        </li>
    );
};

FilterBlock.defaultProps = {
    onApply: null,
    initialOpen: false
};

FilterBlock.propTypes = {
    classes: shape({
        header: string,
        list_collapsed: string,
        list_expanded: string,
        name: string,
        root: string,
        trigger: string
    }),
    filterApi: shape({}).isRequired,
    filterState: setValidator,
    group: string.isRequired,
    items: arrayOf(shape({})),
    name: string.isRequired,
    onApply: func,
    initialOpen: bool
};

export default FilterBlock;
