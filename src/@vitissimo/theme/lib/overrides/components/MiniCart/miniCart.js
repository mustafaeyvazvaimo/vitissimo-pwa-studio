import React, { Fragment, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { bool, shape, string } from 'prop-types';

import { useScrollLock, useToasts } from '@magento/peregrine';
import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';

import Price from '@magento/venia-ui/lib/components/Price';
import Button from '@magento/venia-ui/lib/components/Button';
import StockStatusMessage from '@magento/venia-ui/lib/components/StockStatusMessage';
import ProductList from './ProductList/productList';
import operations from './miniCart.gql';

import { AlertCircleIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './miniCart.css';

const errorIcon = <AlertCircleIcon size={20} />;

/**
 * The MiniCart component shows a limited view of the user's cart.
 *
 * @param {Boolean} props.isOpen - Whether or not the MiniCart should be displayed.
 * @param {Function} props.setIsOpen - Function to toggle mini cart
 */
const MiniCart = React.forwardRef((props, ref) => {
    const { isOpen, setIsOpen } = props;

    // Prevent the page from scrolling in the background
    // when the MiniCart is open.
    useScrollLock(isOpen);

    const talonProps = useMiniCart({
        setIsOpen,
        operations
    });

    const {
        closeMiniCart,
        errorMessage,
        handleEditCart,
        handleProceedToCheckout,
        handleRemoveItem,
        loading,
        productList,
        subTotal,
        configurableThumbnailSource
    } = talonProps;

    const rootClass = isOpen ? classes.root_open : classes.root;
    const contentsClass = isOpen ? classes.contents_open : classes.contents;
    const priceClassName = loading ? classes.price_loading : classes.price;

    const isCartEmpty = !(productList && productList.length);

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (errorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: errorMessage,
                dismissable: true,
                timeout: 7000
            });
        }
    }, [addToast, errorMessage]);

    const header = subTotal ? (
        <Fragment>
            <div className={classes.stockStatusMessageContainer}>
                <StockStatusMessage cartItems={productList} />
            </div>
            <span className={priceClassName}>
                <span>
                    <FormattedMessage
                        id={'miniCart.subtotal'}
                        defaultMessage={'Subtotal: '}
                    />
                </span>
                <Price value={subTotal.value} />
            </span>
        </Fragment>
    ) : null;

    const contents = isCartEmpty ? (
        <div className={classes.emptyCart}>
            <div className={classes.emptyMessage}>
                <FormattedMessage
                    id={'miniCart.emptyMessage'}
                    defaultMessage={'There are no items in your cart.'}
                />
            </div>
        </div>
    ) : (
        <Fragment>
            <div className={classes.header}>{header}</div>
            <div className={classes.body}>
                <ProductList
                    items={productList}
                    loading={loading}
                    handleRemoveItem={handleRemoveItem}
                    closeMiniCart={closeMiniCart}
                    configurableThumbnailSource={configurableThumbnailSource}
                />
            </div>
            <div className={classes.footer}>
                <Button
                    onClick={handleProceedToCheckout}
                    priority="high"
                    className={classes.checkoutButton}
                    disabled={loading || isCartEmpty}
                >
                    <FormattedMessage
                        id={'miniCart.checkout'}
                        defaultMessage={'CHECKOUT'}
                    />
                </Button>
                <Button
                    onClick={handleEditCart}
                    priority="high"
                    className={classes.editCartButton}
                    disabled={loading || isCartEmpty}
                >
                    <FormattedMessage
                        id={'miniCart.editCartButton'}
                        defaultMessage={'Edit Shopping Bag'}
                    />
                </Button>
            </div>
        </Fragment>
    );

    return (
        <aside className={rootClass}>
            <div ref={ref} className={contentsClass}>
                {contents}
            </div>
        </aside>
    );
});

export default MiniCart;

MiniCart.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        contents: string,
        contents_open: string,
        header: string,
        body: string,
        footer: string,
        checkoutButton: string,
        editCartButton: string,
        emptyCart: string,
        emptyMessage: string,
        stockStatusMessageContainer: string
    }),
    isOpen: bool
};
