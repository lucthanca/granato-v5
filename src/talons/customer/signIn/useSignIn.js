import { useMutation, useApolloClient } from '@apollo/client';
import { useCallback } from 'react';

import operations, { SIGNIN_MUTATION, MERGE_CARTS } from './useSignIn.gql';

import { useAwaitQuery } from '../../useAwaitQuery';
import { retrieveCartId } from '../../../store/actions/cart';
import { useUserContext } from '../../../context/user';
import { useCartContext } from '../../../context/cart';

export const useSignIn = () => {
  const { createCartMutation, getCustomerQuery, getCartDetailsQuery } = operations;
  const apolloClient = useApolloClient();
  const [{ cartId }, { getCartDetails, removeCart, createCart }] = useCartContext();
  const [, { getUserDetails }] = useUserContext();
  const [signIn, { loading: signInLoading, error, data }] = useMutation(SIGNIN_MUTATION);
  const [mergeCarts, { loading: mergeCartsLoading }] = useMutation(MERGE_CARTS);
  const fetchUserDetails = useAwaitQuery(getCustomerQuery);
  const [fetchCartId, { loading: fetchCartIdLoading }] = useMutation(createCartMutation);
  const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);

  const handleSubmit = useCallback(
    async ({ email, password }) => {
      try {
        const sourceCartId = cartId;

        // Sign in and set the token.
        const signInResponse = await signIn({
          variables: {
            email,
            password,
          },
        });

        // Clear all cart/customer data from cache and redux.
        await apolloClient.clearCacheData(apolloClient, 'cart');
        await apolloClient.clearCacheData(apolloClient, 'customer');
        await removeCart();

        // Create and get the customer's cart id.    const [, { dispatch }] = useEventingContext();

        await createCart({
          fetchCartId,
        });
        const destinationCartId = await retrieveCartId();
        console.log('sourceCartId: ', cartId);
        console.log('destinationCartId: ', destinationCartId);
        // Merge the guest cart into the customer cart.
        const { data: mergeData } = await mergeCarts({
          variables: {
            sourceCartId,
            destinationCartId,
          },
        });
        console.log('merge: ', mergeData);

        await getUserDetails({ fetchUserDetails });
        const { data } = await fetchUserDetails({
          fetchPolicy: 'cache-only',
        });
        // dispatch({
        //   type: 'USER_SIGN_IN',
        //   payload: {
        //       ...data.customer
        //   }
        // });
        await getCartDetails({ fetchCartId, fetchCartDetails });

        // // get the customer's cart id.
        // const getCartIdResponse = await getCartId();
        // console.log("getCartIdResponse: ", getCartIdResponse);
        // const destinationCartId = getCartIdResponse?.data?.customerCart?.id

        // await AppStorage.saveData('cart_id', destinationCartId);
        // console.log("sourceCartId: ", sourceCartId);
        // Merge the guest cart into the customer cart.
        // const mergeCartResponse = await mergeCarts({
        //   variables: {
        //     destinationCartId,
        //     sourceCartId
        //   }
        // });
        // console.log("mergeCartResponse: ", mergeCartResponse);
        // saveCartId(destinationCartId);

        // incoming hoc/Test
        // if(token) {
        //   const getCartIdResponse = await getCartId();
        //   console.log("getCartIdResponse: ", getCartIdResponse);
        //   const destinationCartId = getCartIdResponse?.data?.customerCart?.id

        //   await AppStorage.saveData('cart_id', destinationCartId);
        //   console.log("sourceCartId: ", sourceCartId);
        //   // Merge the guest cart into the customer cart.

        //   const mergeCartResponse = await mergeCarts({
        //     variables: {
        //       destinationCartId,
        //       sourceCartId
        //     }
        //   });
        //   console.log("mergeCartResponse: ", mergeCartResponse);
        //   saveCartId(destinationCartId);
        //   setLogin(true)
        //   navigation.navigate("Home");
        // }

        // -- End incoming
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
        // setIsSigningIn(false);
      }
    },
    [cartId],
  );

  return {
    signIn_error: error,
    token: data?.generateCustomerToken.token,
    signInLoading: signInLoading,
    mergeCartsLoading: mergeCartsLoading,
    fetchCartIdLoading: fetchCartIdLoading,
    signIn,
    handleSubmit,
  };
};
