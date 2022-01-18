import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { ChevronDownIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './showAllButton.css';

const ShowAllButton = props => {
    const { onClick } = props;

    const handleClick = useCallback(() => {
        onClick();
    }, [onClick]);

    return (
        <button className={classes.root} onClick={handleClick}>
            <span className={classes.content}>
                <span className={classes.text}>
                    <FormattedMessage
                        id={'checkoutPage.showAllItems'}
                        defaultMessage={'SHOW ALL ITEMS'}
                    />
                </span>
                <ChevronDownIcon size={20} color="#EC0008" />
            </span>
        </button>
    );
};

export default ShowAllButton;
