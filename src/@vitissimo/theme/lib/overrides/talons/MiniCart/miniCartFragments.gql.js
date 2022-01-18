import { gql } from '@apollo/client';
import { ProductListFragment } from './productListFragments.gql';

export const MiniCartFragment = gql`
    fragment MiniCartFragment on Cart {
        id
        total_quantity
        prices {
            subtotal_excluding_tax {
                currency
                value
            }
            grand_total {
                currency
                value
            }
        }
        ...ProductListFragment
    }
    ${ProductListFragment}
`;
