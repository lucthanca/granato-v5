import { gql } from '@apollo/client';

const WISHLIST_ITEMS_FRAGMENT = gql`
  fragment WishlistItemFragment on WishlistItems {
    items {
      id
      quantity
      product {
        uid
        name
        sku
        url_key
      }
    }
  }
`;

const GET_CUSTOMER_WISHLIST = gql`
  query getCustomerWishlist($id: ID!) {
    customer {
      wishlist_v2(id: $id) {
        id
        items_v2 {
          ...WishlistItemFragment
        }
      }
    }
  }
  ${WISHLIST_ITEMS_FRAGMENT}
`;
const ADD_TO_WISH_LIST_MUTATION = gql`
  mutation addProductToWishlistMutation($wishlistId: ID!, $wishlistItems: [WishlistItemInput!]!) {
    addProductsToWishlist(wishlistId: $wishlistId, wishlistItems: $wishlistItems) {
      user_errors {
        message
      }
      wishlist {
        id
        items_count
        items_v2 {
          ...WishlistItemFragment
        }
        updated_at
      }
    }
  }
  ${WISHLIST_ITEMS_FRAGMENT}
`;
const REMOVE_PRODUCTS_FROM_WISHLIST = gql`
  mutation removeProductsFromWishlist($wlId: ID!, $wlItemsIds: [ID!]!) {
    removeProductsFromWishlist(wishlistId: $wlId, wishlistItemsIds: $wlItemsIds) {
      user_errors {
        message
      }
      wishlist {
        id
        items_count
        items_v2 {
          ...WishlistItemFragment
        }
        updated_at
      }
    }
  }
  ${WISHLIST_ITEMS_FRAGMENT}
`;

export default {
  getCustomerWishlistQuery: GET_CUSTOMER_WISHLIST,
  addToWishlistMutation: ADD_TO_WISH_LIST_MUTATION,
  removeProductsFromWishlistMutation: REMOVE_PRODUCTS_FROM_WISHLIST,
};
