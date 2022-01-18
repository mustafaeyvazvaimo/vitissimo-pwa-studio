import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string, int } from 'prop-types';

import { useWishlist } from '@magento/peregrine/lib/talons/WishlistPage/useWishlist';

import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import WishlistItems from '@magento/venia-ui/lib/components/WishlistPage/wishlistItems';

import classes from './wishlist.css';

const Wishlist = props => {
    const { data } = props;
    const { id, items_count: itemsCount } = data;

    const talonProps = useWishlist({ id, itemsCount });
    const {
        items,
        isLoading
    } = talonProps;

    const contentMessageElement = itemsCount ? (
        <Fragment>
            <WishlistItems items={items} wishlistId={id} />
        </Fragment>
    ) : (
        <p className={classes.emptyListText}>
            <FormattedMessage
                id={'wishlist.emptyListText'}
                defaultMessage={'There are currently no items in this list'}
            />
        </p>
    );

    if (isLoading) {
        return (
            <div className={classes.root}>
                <LoadingIndicator />
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.content}>{contentMessageElement}</div>
        </div>
    );
};

Wishlist.propTypes = {
    classes: shape({
        root: string,
        content: string,
        emptyListText: string
    }),
    data: shape({
        id: int,
        items_count: int
    })
};

Wishlist.defaultProps = {
    data: {
        items_count: 0,
        items_v2: []
    }
};

export default Wishlist;
