import { gql } from '@apollo/client';

export const GET_CONFIG_DATA = gql`
    query storeConfigData {
        storeConfig {
            id
            payment_payable_to @client
            payment_mailing_address @client
        }
    }
`;

export const SET_BANKTRANSFER_PAYMENT_METHOD_ON_CART = gql`
    mutation setPaymentMethodOnCart($cartId: String!) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cartId
                payment_method: { code: "banktransfer" }
            }
        ) @connection(key: "setPaymentMethodOnCart") {
            cart {
                id
                selected_payment_method {
                    code
                    title
                }
            }
        }
    }
`;

export default {
    getCheckmoConfigQuery: GET_CONFIG_DATA,
    setPaymentMethodOnCartMutation: SET_BANKTRANSFER_PAYMENT_METHOD_ON_CART
};
