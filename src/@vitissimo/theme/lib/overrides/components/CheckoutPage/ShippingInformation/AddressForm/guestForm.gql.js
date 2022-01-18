import { gql } from '@apollo/client';
import { PriceSummaryFragment } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/priceSummaryFragments.gql';

import { ShippingMethodsCheckoutFragment } from '@magento/venia-ui/lib/components/CheckoutPage/ShippingMethod/shippingMethodFragments.gql';
import { AvailablePaymentMethodsFragment } from '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentInformation.gql';
import { ShippingInformationFragment } from '../shippingInformationFragments.gql';

export const SET_GUEST_SHIPPING_MUTATION = gql`
    mutation SetGuestShipping(
        $cartId: String!
        $email: String!
        $address: CartAddressInput!
    ) {
        setGuestEmailOnCart(input: { cart_id: $cartId, email: $email })
            @connection(key: "setGuestEmailOnCart") {
            cart {
                id
            }
        }

        setShippingAddressesOnCart(
            input: {
                cart_id: $cartId
                shipping_addresses: [{ address: $address }]
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
        setGuestShippingMutation: SET_GUEST_SHIPPING_MUTATION
    },
    queries: {}
};
