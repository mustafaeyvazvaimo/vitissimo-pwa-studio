import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { shape, string, func } from 'prop-types';

import Trigger from '@magento/venia-ui/lib/components/Trigger';

import { CloseIcon } from '../../../../components/Icons';

import classes from './currentFilter.css';

const CurrentFilter = props => {
    const { group, item, removeItem, onRemove } = props;
    const { formatMessage } = useIntl();

    const handleClick = useCallback(() => {
        removeItem({ group, item });
        if (typeof onRemove === 'function') {
            onRemove(group, item);
        }
    }, [group, item, removeItem, onRemove]);

    const ariaLabel = formatMessage(
        {
            id: 'filterModal.action.clearFilterItem.ariaLabel',
            defaultMessage: 'Clear filter'
        },
        {
            name: item.title
        }
    );

    return (
        <span className={classes.root}>
            <Trigger action={handleClick} ariaLabel={ariaLabel}>
                <CloseIcon color="#EC0008" size={20} strokeWidth={3} />
            </Trigger>
            <span className={classes.text}>{item.title}</span>
        </span>
    );
};

export default CurrentFilter;

CurrentFilter.defaultProps = {
    onRemove: null
};

CurrentFilter.propTypes = {
    classes: shape({
        root: string
    }),
    onRemove: func
};
