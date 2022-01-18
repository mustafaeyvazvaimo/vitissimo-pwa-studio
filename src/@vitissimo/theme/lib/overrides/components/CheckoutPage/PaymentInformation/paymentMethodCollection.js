import banktransfer from '@vitissimo/theme/lib/components/PaymentMethods/BankTransfer/bankTransfer';
import cashondelivery from '@vitissimo/theme/lib/components/PaymentMethods/CashOnDelivery/cashOnDelivery';

export default {
    banktransfer,
    cashondelivery
};

/**
 * This file is augmented at build time using the @magento/venia-ui build
 * target "checkoutPagePaymentTypes", which allows third-party modules to
 * add new payment component mappings for the checkout page.
 *
 * @see [Payment definition object]{@link PaymentDefinition}
 */

/**
 * A payment definition object that describes a payment in your storefront.
 *
 * @typedef {Object} PaymentDefinition
 * @property {string} paymentCode is use to map your payment
 * @property {string} importPath Resolvable path to the component the
 *   Route component will render
 *
 * @example <caption>A custom payment method</caption>
 * const myCustomPayment = {
 *      paymentCode: 'cc',
 *      importPath: '@partner/module/path_to_your_component'
 * }
 */
