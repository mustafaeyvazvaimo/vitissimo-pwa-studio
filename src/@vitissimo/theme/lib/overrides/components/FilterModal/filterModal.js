import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FocusScope } from 'react-aria';
import { array, arrayOf, shape, string } from 'prop-types';

import { useFilterModal } from '@magento/peregrine/lib/talons/FilterModal';

import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import { Portal } from '@magento/venia-ui/lib/components/Portal';
import CurrentFilters from '@magento/venia-ui/lib/components/FilterModal/CurrentFilters';
import FilterBlock from '@magento/venia-ui/lib/components/FilterModal/filterBlock';
import FilterFooter from '@magento/venia-ui/lib/components/FilterModal/filterFooter';

import { CloseIcon } from '../../../components/Icons';

import classes from './filterModal.css';

const FilterModal = props => {
    const { filters } = props;
    const { formatMessage } = useIntl();
    const talonProps = useFilterModal({ filters });
    const {
        filterApi,
        filterItems,
        filterNames,
        filterState,
        handleApply,
        handleClose,
        handleReset,
        handleKeyDownActions,
        isOpen
    } = talonProps;

    const modalClass = isOpen ? classes.root_open : classes.root;

    const filtersList = useMemo(
        () =>
            Array.from(filterItems, ([group, items]) => {
                const blockState = filterState.get(group);
                const groupName = filterNames.get(group);

                return (
                    <FilterBlock
                        key={group}
                        filterApi={filterApi}
                        filterState={blockState}
                        group={group}
                        items={items}
                        name={groupName}
                    />
                );
            }),
        [filterApi, filterItems, filterNames, filterState]
    );

    const filtersAriaLabel = formatMessage({
        id: 'filterModal.filters.ariaLabel',
        defaultMessage: 'Filters'
    });

    const closeAriaLabel = formatMessage({
        id: 'filterModal.filters.close.ariaLabel',
        defaultMessage: 'Close filters popup.'
    });

    const clearAllAriaLabel = formatMessage({
        id: 'filterModal.action.clearAll.ariaLabel',
        defaultMessage: 'Clear all applied filters'
    });

    const clearAll = filterState.size ? (
        <div className={classes.action}>
            <LinkButton
                type="button"
                onClick={handleReset}
                ariaLabel={clearAllAriaLabel}
            >
                <FormattedMessage
                    id={'filterModal.action'}
                    defaultMessage={'Clear all'}
                />
            </LinkButton>
        </div>
    ) : null;

    if (!isOpen) {
        return null;
    }

    return (
        <Portal>
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <FocusScope contain restoreFocus autoFocus>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <aside className={modalClass} onKeyDown={handleKeyDownActions}>
                    <div className={classes.body}>
                        <div className={classes.header}>
                            <h2 className={classes.headerTitle}>
                                <FormattedMessage
                                    id={'filterModal.headerTitle'}
                                    defaultMessage={'Filters'}
                                />
                            </h2>
                            <button
                                onClick={handleClose}
                                ariaDisabled={false}
                                ariaLabel={closeAriaLabel}
                            >
                                <CloseIcon color="#EC0008" />
                            </button>
                        </div>
                        <CurrentFilters
                            filterApi={filterApi}
                            filterNames={filterNames}
                            filterState={filterState}
                        />
                        {clearAll}
                        <ul
                            className={classes.blocks}
                            ariaLabel={filtersAriaLabel}
                        >
                            {filtersList}
                        </ul>
                    </div>
                    <FilterFooter
                        applyFilters={handleApply}
                        hasFilters={!!filterState.size}
                        isOpen={isOpen}
                    />
                </aside>
            </FocusScope>
        </Portal>
    );
};

FilterModal.propTypes = {
    classes: shape({
        action: string,
        blocks: string,
        body: string,
        header: string,
        headerTitle: string,
        root: string,
        root_open: string
    }),
    filters: arrayOf(
        shape({
            attribute_code: string,
            items: array
        })
    )
};

export default FilterModal;
