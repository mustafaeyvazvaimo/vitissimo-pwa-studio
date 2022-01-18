import React, { Fragment, Suspense } from 'react';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';

import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';

import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';

import { ShoppingCartIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './cartTrigger.css';

const MiniCart = React.lazy(() =>
    import('@magento/venia-ui/lib/components/MiniCart')
);

const CartTrigger = props => {
    const {
        handleLinkClick,
        handleTriggerClick,
        itemCount,
        miniCartRef,
        miniCartIsOpen,
        hideCartTrigger,
        setMiniCartIsOpen,
        miniCartTriggerRef
    } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });

    const { formatMessage } = useIntl();
    const buttonAriaLabel = formatMessage(
        {
            id: 'cartTrigger.ariaLabel',
            defaultMessage:
                'Toggle mini cart. You have {count} items in your cart.'
        },
        { count: itemCount }
    );
    const itemCountDisplay = itemCount > 99 ? '99+' : itemCount;
    const triggerClassName = miniCartIsOpen
        ? classes.triggerContainer_open
        : classes.triggerContainer;

    const maybeItemCounter = itemCount ? (
        <span className={classes.counter}>{itemCountDisplay}</span>
    ) : null;

    const cartTrigger = hideCartTrigger ? null : (
        <Fragment>
            <div className={triggerClassName} ref={miniCartTriggerRef}>
                <button
                    aria-label={buttonAriaLabel}
                    className={classes.trigger}
                    onClick={handleTriggerClick}
                >
                    <ShoppingCartIcon color="#000000" />
                    {maybeItemCounter}
                </button>
            </div>
            <button
                aria-label={buttonAriaLabel}
                className={classes.link}
                onClick={handleLinkClick}
            >
                <ShoppingCartIcon color="#000000" />
                {maybeItemCounter}
            </button>
            <Suspense fallback={null}>
                <MiniCart
                    isOpen={miniCartIsOpen}
                    setIsOpen={setMiniCartIsOpen}
                    ref={miniCartRef}
                />
            </Suspense>
        </Fragment>
    );

    return cartTrigger;
};

export default CartTrigger;

CartTrigger.propTypes = {
    classes: shape({
        counter: string,
        link: string,
        openIndicator: string,
        root: string,
        trigger: string,
        triggerContainer: string
    })
};
