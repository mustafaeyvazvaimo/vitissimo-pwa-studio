import React, { Fragment, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { useWindowSize, useToasts } from '@magento/peregrine';
import {
    CHECKOUT_STEP,
    useCheckoutPage
} from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';

import Button from '@magento/venia-ui/lib/components/Button';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import StockStatusMessage from '@magento/venia-ui/lib/components/StockStatusMessage';
import FormError from '@magento/venia-ui/lib/components/FormError';

import OrderConfirmationPage from './OrderConfirmationPage/orderConfirmationPage';
import ItemsReview from './ItemsReview/itemsReview';
import AddressBook from './AddressBook/addressBook';
import ShippingInformation from './ShippingInformation/shippingInformation';
import ShippingMethod from './ShippingMethod/shippingMethod';
import OrderSummary from './OrderSummary/orderSummary';
import PaymentInformation from './PaymentInformation/paymentInformation';
import payments from './PaymentInformation/paymentMethodCollection';

import ScrollAnchor from '@magento/venia-ui/lib/components/ScrollAnchor/scrollAnchor';

import { AlertCircleIcon } from '@vitissimo/theme/lib/components/Icons';

import classes from './checkoutPage.css';

const errorIcon = <AlertCircleIcon size={20} />;

const CheckoutPage = props => {
    const { formatMessage } = useIntl();
    const talonProps = useCheckoutPage();

    const {
        /**
         * Enum, one of:
         * SHIPPING_ADDRESS, SHIPPING_METHOD, PAYMENT, REVIEW
         */
        activeContent,
        availablePaymentMethods,
        cartItems,
        checkoutStep,
        customer,
        error,
        handlePlaceOrder,
        hasError,
        isCartEmpty,
        isGuestCheckout,
        isLoading,
        isUpdating,
        orderDetailsData,
        orderDetailsLoading,
        orderNumber,
        placeOrderLoading,
        setCheckoutStep,
        setIsUpdating,
        setShippingInformationDone,
        scrollShippingInformationIntoView,
        setShippingMethodDone,
        scrollShippingMethodIntoView,
        setPaymentInformationDone,
        shippingInformationRef,
        shippingMethodRef,
        resetReviewOrderButtonClicked,
        handleReviewOrder,
        reviewOrderButtonClicked,
        toggleAddressBookContent
    } = talonProps;

    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (hasError) {
            const message =
                error && error.message
                    ? error.message
                    : formatMessage({
                          id: 'checkoutPage.errorSubmit',
                          defaultMessage:
                              'Oops! An error occurred while submitting. Please try again.'
                      });
            addToast({
                type: 'error',
                icon: errorIcon,
                message,
                dismissable: true,
                timeout: 7000
            });

            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }
        }
    }, [addToast, error, formatMessage, hasError]);

    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 768;

    let checkoutContent;

    const heading = isGuestCheckout
        ? formatMessage({
              id: 'checkoutPage.guestCheckout',
              defaultMessage: 'Guest Checkout'
          })
        : formatMessage({
              id: 'checkoutPage.checkout',
              defaultMessage: 'Checkout'
          });

    if (orderNumber && orderDetailsData) {
        return (
            <OrderConfirmationPage
                data={orderDetailsData}
                orderNumber={orderNumber}
            />
        );
    } else if (isLoading) {
        return fullPageLoadingIndicator;
    } else if (isCartEmpty) {
        checkoutContent = (
            <div className={classes.empty_cart_container}>
                <div className={classes.heading_container}>
                    <h1 className={classes.heading}>{heading}</h1>
                </div>
                <h3>
                    <FormattedMessage
                        id={'checkoutPage.emptyMessage'}
                        defaultMessage={'There are no items in your cart.'}
                    />
                </h3>
            </div>
        );
    } else {
        const shippingMethodSection =
            checkoutStep >= CHECKOUT_STEP.SHIPPING_METHOD ? (
                <ShippingMethod
                    pageIsUpdating={isUpdating}
                    onSave={setShippingMethodDone}
                    onSuccess={scrollShippingMethodIntoView}
                    setPageIsUpdating={setIsUpdating}
                />
            ) : (
                <h3 className={classes.shipping_method_heading}>
                    <FormattedMessage
                        id={'checkoutPage.shippingMethodStep'}
                        defaultMessage={'2. Shipping Method'}
                    />
                </h3>
            );

        const formErrors = [];
        const paymentMethods = Object.keys(payments);
        const isPaymentAvailable = !!availablePaymentMethods.find(
            ({ code }) => code === 'free' || paymentMethods.includes(code)
        );

        if (!availablePaymentMethods) {
            formErrors.push(
                new Error(
                    formatMessage({
                        id: 'checkoutPage.noPaymentAvailable',
                        defaultMessage: 'Payment is currently unavailable.'
                    })
                )
            );
        }

        const paymentInformationSection =
            checkoutStep >= CHECKOUT_STEP.PAYMENT ? (
                <PaymentInformation
                    onSave={setPaymentInformationDone}
                    checkoutError={error}
                    resetShouldSubmit={resetReviewOrderButtonClicked}
                    setCheckoutStep={setCheckoutStep}
                    shouldSubmit={reviewOrderButtonClicked}
                />
            ) : (
                <h3 className={classes.payment_information_heading}>
                    <FormattedMessage
                        id={'checkoutPage.paymentInformationStep'}
                        defaultMessage={'3. Payment Information'}
                    />
                </h3>
            );

        const reviewOrderButton =
            checkoutStep === CHECKOUT_STEP.PAYMENT ? (
                <Button
                    onClick={handleReviewOrder}
                    priority="high"
                    className={classes.review_order_button}
                    disabled={
                        reviewOrderButtonClicked ||
                        isUpdating ||
                        !isPaymentAvailable
                    }
                >
                    <FormattedMessage
                        id={'checkoutPage.reviewOrder'}
                        defaultMessage={'Review Order'}
                    />
                </Button>
            ) : null;

        const itemsReview =
            checkoutStep === CHECKOUT_STEP.REVIEW ? (
                <div className={classes.items_review_container}>
                    <ItemsReview />
                </div>
            ) : null;

        const placeOrderButton =
            checkoutStep === CHECKOUT_STEP.REVIEW ? (
                <Button
                    onClick={handlePlaceOrder}
                    priority="high"
                    className={classes.place_order_button}
                    disabled={
                        isUpdating || placeOrderLoading || orderDetailsLoading
                    }
                >
                    <FormattedMessage
                        id={'checkoutPage.placeOrder'}
                        defaultMessage={'Place Order'}
                    />
                </Button>
            ) : null;

        // If we're on mobile we should only render price summary in/after review.
        const shouldRenderPriceSummary = !(
            isMobile && checkoutStep < CHECKOUT_STEP.REVIEW
        );

        const orderSummary = shouldRenderPriceSummary ? (
            <div className={classes.summaryContainer}>
                <OrderSummary isUpdating={isUpdating} />
                <div className={classes.backToCartLink}>
                    <Link to={'/cart'}>
                        <Button priority="high">
                            <FormattedMessage
                                id={'checkoutPage.returnToCart'}
                                defaultMessage={'Return to Cart'}
                            />
                        </Button>
                    </Link>
                </div>
            </div>
        ) : null;

        let headerText;

        if (isGuestCheckout) {
            headerText = formatMessage({
                id: 'checkoutPage.guestCheckout',
                defaultMessage: 'Guest Checkout'
            });
        } else if (customer.default_shipping) {
            headerText = formatMessage({
                id: 'checkoutPage.reviewAndPlaceOrder',
                defaultMessage: 'Review and Place Order'
            });
        } else {
            headerText = formatMessage(
                { id: 'checkoutPage.greeting', defaultMessage: 'Welcome' },
                { firstname: customer.firstname }
            );
        }

        const checkoutContentClass =
            activeContent === 'checkout'
                ? classes.checkoutContent
                : classes.checkoutContent_hidden;

        const stockStatusMessageElement = (
            <Fragment>
                <FormattedMessage
                    id={'checkoutPage.stockStatusMessage'}
                    defaultMessage={
                        'An item in your cart is currently out-of-stock and must be removed in order to Checkout. Please return to your cart to remove the item.'
                    }
                />
            </Fragment>
        );
        checkoutContent = (
            <div className={checkoutContentClass}>
                <div className={classes.heading_container}>
                    <FormError
                        classes={{
                            root: classes.formErrors
                        }}
                        errors={formErrors}
                    />
                    <StockStatusMessage
                        cartItems={cartItems}
                        message={stockStatusMessageElement}
                    />
                    <h1 className={classes.heading}>{headerText}</h1>
                </div>
                <div className={classes.shipping_information_container}>
                    <ScrollAnchor ref={shippingInformationRef}>
                        <ShippingInformation
                            onSave={setShippingInformationDone}
                            onSuccess={scrollShippingInformationIntoView}
                            toggleActiveContent={toggleAddressBookContent}
                        />
                    </ScrollAnchor>
                </div>
                <div className={classes.shipping_method_container}>
                    <ScrollAnchor ref={shippingMethodRef}>
                        {shippingMethodSection}
                    </ScrollAnchor>
                </div>
                <div className={classes.payment_information_container}>
                    {paymentInformationSection}
                </div>
                {reviewOrderButton}
                {itemsReview}
                {orderSummary}
                {placeOrderButton}
            </div>
        );
    }

    const addressBookElement = !isGuestCheckout ? (
        <AddressBook
            activeContent={activeContent}
            toggleActiveContent={toggleAddressBookContent}
            onSuccess={scrollShippingInformationIntoView}
        />
    ) : null;

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'checkoutPage.titleCheckout',
                    defaultMessage: 'Checkout'
                })}
            </StoreTitle>
            {checkoutContent}
            {addressBookElement}
        </div>
    );
};

export default CheckoutPage;

CheckoutPage.propTypes = {
    classes: shape({
        root: string,
        checkoutContent: string,
        checkoutContent_hidden: string,
        heading_container: string,
        heading: string,
        cartLink: string,
        stepper_heading: string,
        shipping_method_heading: string,
        payment_information_heading: string,
        signInContainer: string,
        signInLabel: string,
        signInButton: string,
        empty_cart_container: string,
        shipping_information_container: string,
        shipping_method_container: string,
        payment_information_container: string,
        price_adjustments_container: string,
        items_review_container: string,
        summaryContainer: string,
        formErrors: string,
        review_order_button: string,
        place_order_button: string
    })
};
