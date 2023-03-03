import { gql } from '@apollo/client';
import { MiniCartFragment } from '../../../checkout/cart/miniCartFragments.gql';

const ADD_PRODUCTS_TO_CART = gql`
  mutation addProductToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
    addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
      cart {
        id
        ...MiniCartFragment
      }
    }
  }
  ${MiniCartFragment}
`;

export default {
  addProductsToCartMutation: ADD_PRODUCTS_TO_CART,
};
