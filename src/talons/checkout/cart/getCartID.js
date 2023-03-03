import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_CART_ID } from './getCartID.gql';
import AppStorage from '@helper/storage';

export const getCartID = (props) => {
  const [getCartId, { loading, error, data }] = useLazyQuery(GET_CART_ID);


  return {
    error: error,
    myCartID: data?.customerCart?.id,
    loading: loading,
    getCartId,
  };
};
