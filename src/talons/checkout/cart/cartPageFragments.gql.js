import { gql } from '@apollo/client';

// import { GiftCardFragment } from './GiftCards/giftCardFragments.gql';
import { ProductListingFragment } from './ProductListing/productListingFragments.gql';
import { PriceSummaryFragment } from './PriceSummary/priceSummaryFragments.gql';
import { AppliedCouponsFragment } from './PriceAdjustments/CouponCode/couponCodeFragments.gql';

export const CartPageFragment = gql`
    fragment CartPageFragment on Cart {
        id
        total_quantity
        ...AppliedCouponsFragment
        ...ProductListingFragment
        ...PriceSummaryFragment
    }
    ${AppliedCouponsFragment}
    ${ProductListingFragment}
    ${PriceSummaryFragment}
`;
