import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useItemsReview } from '@magento/peregrine/lib/talons/CheckoutPage/ItemsReview/useItemsReview';

import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

import Item from './item';
import ShowAllButton from './showAllButton';

import classes from './itemsReview.css';

const ItemsReview = props => {
    const talonProps = useItemsReview({
        data: props.data
    });

    const {
        items: itemsInCart,
        totalQuantity,
        showAllItems,
        setShowAllItems,
        isLoading,
        configurableThumbnailSource
    } = talonProps;

    const items = itemsInCart.map((item, index) => (
        <Item
            key={item.id}
            {...item}
            isHidden={!showAllItems && index >= 2}
            configurableThumbnailSource={configurableThumbnailSource}
        />
    ));

    const showAllItemsFooter = !showAllItems ? (
        <ShowAllButton onClick={setShowAllItems} />
    ) : null;

    if (isLoading) {
        return (
            <LoadingIndicator>
                <FormattedMessage
                    id={'checkoutPage.fetchingItemsInYourOrder'}
                    defaultMessage={'Fetching Items in your Order'}
                />
            </LoadingIndicator>
        );
    }

    return (
        <div className={classes.items_review_container}>
            <div className={classes.total_quantity}>
                <span className={classes.total_quantity_amount}>
                    {totalQuantity}
                </span>
                <FormattedMessage
                    id={'checkoutPage.itemsInYourOrder'}
                    defaultMessage={' items in your order'}
                />
            </div>
            <div className={classes.items_container}>{items}</div>
            {showAllItemsFooter}
        </div>
    );
};

export default ItemsReview;
