import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_CART, UPDATE_CART, APPLY_COUPON_TO_CART, REMOVE_COUPON_FROM_CART } from './useGetCart.gql';
import React, { useEffect, useCallback } from 'react';

import Toast from 'react-native-toast-message';
import { useCartContext } from '../../../context/cart';
import { useUserContext } from '../../../context/user';
export const useGetCart = () => {
  // const [{ cartId }, { saveCartId }] = useCartContext();
  const cartContext = useCartContext();
  const [{ isSignedIn }] = useUserContext();
  // const [value,] = cartContext;

  const { cartId } = cartContext?.[0] || {};
  const test = cartContext?.[1] || {};
  const { setCartDetails } = test;

  const saveCartId = useCallback(() => {}, []);

  // const cartId = 'eiNFHZ109QQ5S7Rsda96yVN8qb4Csqvl';
  const { data, loading, error, refetch } = useQuery(GET_CART, {
    variables: {
      cartId: cartId,
    },
  });
  const [getCart, { data: dataLazy, loading: loadingLazy, error: errorLazy }] = useLazyQuery(GET_CART);
  const [updateCart, { loading: loadingUpdateCart }] = useMutation(UPDATE_CART, {
    refetchQueries: [
      {
        query: GET_CART,
        variables: {
          cartId: cartId,
        },
      },
    ],
  });
  const [applyCoupon, { loading: loadingApplyCoupon, error: errorApplyCoupon, data: dataApplyCoupon }] = useMutation(
    APPLY_COUPON_TO_CART,
    {
      refetchQueries: [
        {
          query: GET_CART,
          variables: {
            cartId: cartId,
          },
        },
      ],
    },
  );
  const [removeCoupon, { loading: loadingRemoveCoupon, error: errorRemoveCoupon, data: dataRemoveCoupon }] = useMutation(
    REMOVE_COUPON_FROM_CART,
    {
      refetchQueries: [
        {
          query: GET_CART,
          variables: {
            cartId: cartId,
          },
        },
      ],
    },
  );

  useEffect(() => {
    if (cartId) {
      // console.log(' on refetch');
      refetch();
    }
  }, [cartId]);

  useEffect(() => {
    if (errorApplyCoupon) {
      Toast.show({
        type: 'customError',
        text1: 'notfound coupon code',
      });
    }
  }, [errorApplyCoupon, errorRemoveCoupon]);

  const handleRemoveCoupon = React.useCallback(async () => {
    removeCoupon({
      variables: {
        input: {
          cart_id: cartId,
        },
      },
    });
  }, [cartId, removeCoupon]);

  const handleApplyCoupon = React.useCallback(
    coupon_code => {
      applyCoupon({
        variables: {
          input: {
            cart_id: cartId,
            coupon_code,
          },
        },
      });
    },
    [applyCoupon, cartId],
  );

  const handleUpdateCart = React.useCallback(
    (cartItemId, qty) => {
      updateCart({
        variables: {
          input: {
            cart_id: cartId,
            cart_items: [
              {
                cart_item_id: cartItemId,
                quantity: qty,
              },
            ],
          },
        },
      });
    },
    [updateCart, cartId],
  );

  const handleRemoveItem = React.useCallback(
    cartItemId => {
      updateCart({
        variables: {
          input: {
            cart_id: cartId,
            cart_items: [
              {
                cart_item_id: cartItemId,
                quantity: 0,
              },
            ],
          },
        },
      });
    },
    [updateCart, cartId],
  );

  const cartData = React.useMemo(() => {
    return data?.cart;
  }, [data, loading]);

  const total = React.useMemo(() => {
    if (cartData) {
      return cartData.total_quantity;
    }
  }, [cartData]);

  const isUsedCoupon = React.useMemo(() => {
    if (cartData && cartData.applied_coupon) {
      return true;
    } else {
      return false;
    }
  }, [cartData]);
  const successToastProps = React.useMemo(() => {
    if (dataApplyCoupon) {
      Toast.show({
        type: 'customSuccess',
        props: {
          text2: 'using coupon customSuccess',
        },
      });
    }
    return null;
  }, [dataApplyCoupon]);

  const removeToastProps = React.useMemo(() => {
    if (dataRemoveCoupon) {
      Toast.show({
        type: 'customSuccess',
        props: {
          text2: 'remove coupon success',
        },
      });
    }
    return null;
  }, [dataRemoveCoupon]);

  const couponCode = React.useMemo(() => {
    if (cartData && cartData.applied_coupon) {
      return cartData.applied_coupon.code;
    } else {
      return null;
    }
  }, [cartData]);

  const handlesaveCart = useCallback(e => {
    console.log(e);
  }, []);

  return {
    cartData: cartData,
    loading: loadingLazy || loadingUpdateCart || loadingRemoveCoupon || loadingApplyCoupon,
    errorLazy,
    getCart,
    handleUpdateCart,
    handleRemoveItem,
    cartId,
    handlesaveCart,
    saveCartId,
    handleApplyCoupon,
    isUsedCoupon,
    couponCode,
    handleRemoveCoupon,
    total,
  };
};
