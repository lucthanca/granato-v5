import { gql } from '@apollo/client';

import { CheckoutPageFragment } from './checkoutPageFragments.gql';
import { CartPageFragment } from '../../../talon/checkout/cart/cartPageFragments.gql';
import { ProductDetailsFragment } from '../../catalog/product/productDetailFragment.gql';


export const GET_CUSTOMER = gql`
    query GetCustomerAfterSignIn {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        customer {
            email
            firstname
            lastname
            is_subscribed
            wishlists{
                id
                items_count
                items_v2{
                    items{
                        id
                        product{
                            ...ProductDetailsFragment                     
                        }
                        quantity
                    } 
                }
            }
        }
    }
    ${ProductDetailsFragment}
`;

export const SIGNIN_MUTATION = gql`
mutation generateCustomerToken($email: String!, $password: String!) {
  generateCustomerToken(email: $email, password: $password) {
    token
}
}
`;

export const CREATE_CART = gql`
    mutation CreateCartAfterSignIn {
        cartId: createEmptyCart
    }
`;

export const MERGE_CARTS = gql`
    mutation MergeCartsAfterSignIn(
        $sourceCartId: String!
        $destinationCartId: String!
    ) {
        mergeCarts(
            source_cart_id: $sourceCartId
            destination_cart_id: $destinationCartId
        ) {
            id
            # eslint-disable-next-line @graphql-eslint/require-id-when-available            
            items { uid }
            ...CheckoutPageFragment
        }
    }
    ${CheckoutPageFragment}
`;


export const GET_CART_DETAILS_QUERY = gql`
    query GetCartDetailsAfterSignIn($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            # eslint-disable-next-line @graphql-eslint/require-id-when-available
            items {
                uid
                # eslint-disable-next-line @graphql-eslint/require-id-when-available
                product {
                    uid
                    name
                    sku
                    small_image {
                        url
                        label
                    }
                    price {
                        regularPrice {
                            amount {
                                value
                            }
                        }
                    }
                }
                quantity
                # eslint-disable-next-line @graphql-eslint/require-id-when-available
                ... on ConfigurableCartItem {
                    # eslint-disable-next-line @graphql-eslint/require-id-when-available
                    configurable_options {
                        configurable_product_option_uid
                        option_label
                        configurable_product_option_value_uid
                        value_label
                    }
                }
            }
            prices {
                grand_total {
                    value
                    currency
                }
            }
            ...CartPageFragment
        }
    }
    ${CartPageFragment}
`;


export default {
    createCartMutation: CREATE_CART,
    getCustomerQuery: GET_CUSTOMER,
    getCartDetailsQuery: GET_CART_DETAILS_QUERY
}










