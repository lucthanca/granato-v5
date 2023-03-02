import { gql } from '@apollo/client';
import { cartItemFragment } from './cartItemFragment.gql';
import { CartPageFragment } from './cartPageFragments.gql';
export const GET_CART = gql`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      applied_coupon {
        code
      }
      applied_coupons {
        code
      }
      available_payment_methods {
        code
        title
      }
      email
      id
      is_virtual
      shipping_addresses {
        selected_shipping_method {
          amount {
            currency
            value
          }
        }
        street
      }
      prices {
        grand_total {
          currency
          value
        }
        subtotal_excluding_tax {
          currency
          value
        }
        subtotal_including_tax {
          currency
          value
        }
        subtotal_with_discount_excluding_tax {
          currency
          value
        }
        discounts {
          label
          amount {
            currency
            value
          }
        }
        subtotal_with_discount_excluding_tax {
          currency
          value
        }
      }
      items {
        id
        uid
        ... on ConfigurableCartItem {
          configurable_options {
            id
            option_label
            value_label
            value_id
          }
        }
        quantity
        product {
          url_key
          name
          price_range {
            maximum_price {
              final_price {
                currency
                value
              }
            }
          }
          image {
            url
          }
          id
          uid
        }
      }
      total_quantity
    }
  }
`;

export const UPDATE_CART = gql`
  mutation updateCart($input: UpdateCartItemsInput) {
    updateCartItems(input: $input) {
      cart {
        email
        id
        is_virtual
        total_quantity
      }
    }
  }
`;

export const APPLY_COUPON_TO_CART = gql`
  mutation applyCouponToCart($input: ApplyCouponToCartInput) {
    applyCouponToCart(input: $input) {
      cart {
        id
      }
    }
  }
`;
export const REMOVE_COUPON_FROM_CART = gql`
  mutation removeCouponFromCart($input: RemoveCouponFromCartInput) {
    removeCouponFromCart(input: $input) {
      cart {
        id
      }
    }
  }
`;
