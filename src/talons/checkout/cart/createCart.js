import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { CREATE_EMPTY_CART_GUEST } from './createCart.gql';
import AppStorage from '../../../utils/simpleStorage';

export const createCart = props => {
  const [createCartGuest, { loading: createCartGuestLoading, error, data }] = useMutation(CREATE_EMPTY_CART_GUEST);
  useEffect(() => {
    if (createCartGuestLoading) {
      console.log('loading...');
    } else if (!createCartGuestLoading && data) {
      AppStorage.setData('cartId', data.id);
    }
    if (error) {
      console.log('error: ', error);
    }
  }, [createCartGuestLoading, data, error]);
  return {
    error: error,
    data: data,
    createCartGuestLoading,
    cartGuestId: data?.id,
    createCartGuest,
  };
};
