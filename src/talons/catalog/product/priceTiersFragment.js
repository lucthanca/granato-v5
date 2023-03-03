import { gql } from '@apollo/client';

export const PriceTiersFragment = gql`
  fragment PriceTiersFragment on ProductInterface {
    price_tiers {
      discount {
        amount_off
        percent_off
      }
      final_price {
        currency
        value
      }
      quantity
      final_price_incl_tax {
        currency
        value
      }
    }
  }
`;
