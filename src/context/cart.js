import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';

import { gql } from '@apollo/client';
import { useAwaitQuery } from '../talons/useAwaitQuery';
import actions from '../store/actions/cart/actions';
import * as asyncActions from '../store/actions/cart/asyncActions';
import bindActionCreators from '../utils/bindActionCreators';
import { GET_CART } from '../talons/checkout/cart/useGetCart.gql';

// import storage from '@helper/storage';

const CartContext = createContext(undefined);

const isCartEmpty = cart => !cart || !cart.details.items || cart.details.items.length === 0;
const getTotalQuantity = items => items.reduce((total, item) => total + item.quantity, 0);

const CartContextProvider = props => {
  const { actions, asyncActions, cartState, children } = props;

  // Make deeply nested details easier to retrieve and provide empty defaults
  const derivedDetails = useMemo(() => {
    if (isCartEmpty(cartState)) {
      return {
        currencyCode: 'USD',
        numItems: 0,
        subtotal: 0,
      };
    } else {
      return {
        currencyCode: cartState.details.prices.grand_total.currency,
        numItems: getTotalQuantity(cartState.details.items),
        subtotal: cartState.details.prices.grand_total.value,
      };
    }
  }, [cartState]);

  // const refetchCart = async () => {
  //   await client.refetchQueries({
  //     include: ['SomeQueryName'],
  //   });
  // };

  const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
  const fetchCartDetails = useAwaitQuery(GET_CART);
  const cartApi = useMemo(() => ({ actions, ...asyncActions }), [actions, asyncActions]);

  const contextValue = useMemo(() => {
    const derivedCartState = {
      ...cartState,
      isEmpty: isCartEmpty(cartState),
      derivedDetails,
    };

    return [derivedCartState, cartApi];
  }, [cartApi, cartState, derivedDetails]);

  useEffect(() => {
    // cartApi.getCartDetails initializes the cart if there isn't one.
    console.log('init cart on load');
    cartApi.getCartDetails({
      fetchCartId,
      fetchCartDetails,
    });
  }, [cartApi, fetchCartDetails, fetchCartId]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

const mapStateToProps = ({ cart }) => ({ cartState: cart });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  asyncActions: bindActionCreators(asyncActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContextProvider);

export const useCartContext = () => useContext(CartContext);

/**
 * We normally do not keep GQL queries in Peregrine. All components should pass
 * queries to talons/hooks. This is an exception to the rule because it would
 * be unecessarily complex to pass these queries to the context provider.
 */
const CREATE_CART_MUTATION = gql`
  mutation createCart {
    cartId: createEmptyCart
  }
`;

// const CART_DETAILS_QUERY = gql`
//   query checkUserIsAuthed($cartId: String!) {
//     cart(cart_id: $cartId) {
//       # The purpose of this query is to check that the user is authorized
//       # to query on the current cart. Just fetch "id" to keep it small.
//       applied_coupon {
//             code
//             }
//             applied_coupons {
//             code
//             }
//             available_payment_methods {
//             code
//             title
//             }
//             email
//             id
//             is_virtual
//             prices{
//                 grand_total{
//                     currency
//                     value
//                 }
//                 subtotal_excluding_tax{
//                     currency
//                     value
//                 }
//                 subtotal_including_tax{
//                     currency
//                     value
//                 }
//                 subtotal_with_discount_excluding_tax{
//                     currency
//                     value
//                 }
//                 discounts{
//                     label
//                     amount{
//                     currency
//                     value
//                     }
//                 }
//                 subtotal_with_discount_excluding_tax{
//                     currency
//                     value
//                 }
//                 }
//             items {
//             id
//             uid
//             ... on ConfigurableCartItem {
//                 configurable_options {
//                     id
//                 option_label
//                 value_label
//                 value_id
//                 }
//             }
//             quantity
//             product {
//                 name
//                 price_range {
//                 maximum_price {
//                     final_price {
//                     currency
//                     value
//                     }
//                 }
//                 }
//                 image {
//                 url
//                 }
//                 id
//                 uid
//             }
//       }
//       total_quantity
//     }
//   }
// `;
