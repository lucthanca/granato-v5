import { gql } from '@apollo/client';

const GET_UPSELL_PRODUCT_LIST = gql`
  query getUpsellProducts($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
        __typename
        id
        uid
        url_key
        upsell_products {
          __typename
          id
          uid
          name
          sku
          url_key
          price_range {
            maximum_price {
              final_price {
                value
                currency
              }
              regular_price {
                value
                currency
              }
            }
            minimum_price {
              final_price {
                value
                currency
              }
              regular_price {
                value
                currency
              }
            }
          }
          small_image {
            url
          }
        }
      }
    }
  }
`;
export default {
  getUpsellProductsQuery: GET_UPSELL_PRODUCT_LIST,
};
