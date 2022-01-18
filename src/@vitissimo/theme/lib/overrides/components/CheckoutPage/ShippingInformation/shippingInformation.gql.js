import { gql } from '@apollo/client';
import { PriceSummaryFragment } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/priceSummaryFragments.gql';

import { ShippingMethodsCheckoutFragment } from '@magento/venia-ui/lib/components/CheckoutPage/ShippingMethod/shippingMethodFragments.gql';
import { AvailablePaymentMethodsFragment } from '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentInformation.gql';
import { ShippingInformationFragment } from './shippingInformationFragments.gql';

export const GET_SHIPPING_INFORMATION = gql`
    query GetShippingInformation($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...ShippingInformationFragment
        }
    }
    ${ShippingInformationFragment}
`;

export const GET_DEFAULT_SHIPPING = gql`
    query GetDefaultShipping {
        customer {
            id
            default_shipping
        }
    }
`;

export const SET_CUSTOMER_ADDRESS_ON_CART = gql`
    mutation SetCustomerAddressOnCart($cartId: String!, $addressId: Int!) {
        setShippingAddressesOnCart(
            input: {
                cart_id: $cartId
                shipping_addresses: [{ customer_address_id: $addressId }]
            }
        ) @connection(key: "setShippingAddressesOnCart") {
            cart {
                id
                ...ShippingInformationFragment
                ...ShippingMethodsCheckoutFragment
                ...PriceSummaryFragment
                ...AvailablePaymentMethodsFragment
            }
        }
    }
    ${ShippingInformationFragment}
    ${ShippingMethodsCheckoutFragment}
    ${PriceSummaryFragment}
    ${AvailablePaymentMethodsFragment}
`;

export default {
    mutations: {
        setDefaultAddressOnCartMutation: SET_CUSTOMER_ADDRESS_ON_CART
    },
    queries: {
        getDefaultShippingQuery: GET_DEFAULT_SHIPPING,
        getShippingInformationQuery: GET_SHIPPING_INFORMATION
    }
};
