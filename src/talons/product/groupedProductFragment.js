import { gql } from '@apollo/client';
import { PriceTiersFragment } from './priceTiersFragment';
import { PriceRangeFragment } from './priceRangeFragment';

export const GroupedProductDetailsFragment = gql`
  fragment GroupedProductDetailsFragment on ProductInterface {
    ... on GroupedProduct {
      grouped_items: items {
        qty
        position
        product {
          uid
          name
          sku
          url_key
          ...PriceTiersFragment
          price_range {
            maximum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
              final_price_excl_tax {
                currency
                value
              }
            }
            minimum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
              final_price_excl_tax {
                currency
                value
              }
            }
          }
        }
      }
    }
  }
  ${PriceTiersFragment}
`;
