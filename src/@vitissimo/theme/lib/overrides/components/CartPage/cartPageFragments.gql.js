import { gql } from '@apollo/client';

import { GiftCardFragment } from '@magento/venia-ui/lib/components/CartPage/GiftCards/giftCardFragments';
import { AppliedCouponsFragment } from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode/couponCodeFragments';
import { ProductListingFragment } from '@magento/venia-ui/lib/components/CartPage/ProductListing/productListingFragments';
import { PriceSummaryFragment } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/priceSummaryFragments.gql';

export const CartPageFragment = gql`
    fragment CartPageFragment on Cart {
        id
        total_quantity
        ...AppliedCouponsFragment
        ...GiftCardFragment
        ...ProductListingFragment
        ...PriceSummaryFragment
    }
    ${AppliedCouponsFragment}
    ${GiftCardFragment}
    ${ProductListingFragment}
    ${PriceSummaryFragment}
`;
