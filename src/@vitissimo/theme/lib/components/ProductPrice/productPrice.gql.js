import { gql } from '@apollo/client';

export const GET_PRICE_RANGE = gql`
    query getPriceRangeBySku($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                __typename
                name
                sku
                price_range {
                    minimum_price {
                        regular_price {
                            value
                            currency
                        }
                        discount {
                            percent_off
                            amount_off
                        }
                        final_price {
                            value
                            currency
                        }
                    }
                }
            }
        }
    }
`;

export default {
    getPriceRangeQuery: GET_PRICE_RANGE
};
