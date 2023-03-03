import { gql } from '@apollo/client';
import { ProductDetailsFragment } from '../../catalog/product/productDetailFragment.gql';

export const ADD_TO_WISHLIST = gql`
    mutation AddProductToWishlistFromGallery(
        $wishlistId: ID!
        $sku: String!
    ) {
        addProductsToWishlist(
            wishlistId: $wishlistId
            wishlistItems: [{
                sku: $sku,
                quantity: 1
            }]
        ) {
            user_errors {
                code
                message
            }
        }
    }
`;

export const GET_PRODUCTS_IN_WISHLISTS = gql`
    query getCustomerWishlist($wishlistId: ID!) {
        customer{
            wishlist_v2(id: $wishlistId){
                id
                items_count
                items_v2{
                    items{
                        id
                        product{
                            ...ProductDetailsFragment
                        }
                    }
                }
            }
        }
    }
    ${ProductDetailsFragment}
`;


export const REMOVE_FROM_WISHLIST = gql`
    mutation RemoveProductsFromWishlist(
        $wishlistId: ID!
        $wishlistItemId:  ID!
    ) {
        removeProductsFromWishlist(
            wishlistId: $wishlistId
            wishlistItemsIds: [$wishlistItemId]
        ) {
            user_errors {
                code
                message
            }
        }
    }
`;

export const ADD_SIMPLE_PRODUCT_TO_CART = gql`
    mutation addSimpleProductToCart($cartId: String!,$sku: String! ) {
        addSimpleProductsToCart(input: { cart_id: $cartId, cart_items: [
            {
                data:{
                    sku:$sku ,
                    quantity: 1
                }
            }
        ] }) {
        cart {
                id
                is_virtual
                total_quantity
            }
        }
    }
`;


export default {
    addProductToWishlistMutation: ADD_TO_WISHLIST,
    getProductsInWishlistsQuery: GET_PRODUCTS_IN_WISHLISTS,
    removeProductsFromWishlistMutation: REMOVE_FROM_WISHLIST,
    addSimpleProductToCartMutation: ADD_SIMPLE_PRODUCT_TO_CART
};
