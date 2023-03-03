import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { MERGE_CARTS } from './mergeCart.gql';
import AppStorage from '@helper/storage';
import { useCartContext } from 'simicart';
export const mergeCarts = (props) => {
  const [{ }, { }] = useCartContext();
  const [mergeTwoCarts, { loading, error, data }] = useMutation(MERGE_CARTS);
  React.useEffect(() => {
    console.log("loading", loading)
    console.log("error", error)
    console.log("data", data)
  }, [loading, error, data])

  return {
    error: error,
    mergeCartId: data?.mergeCarts.id,
    loading: loading,
    mergeTwoCarts,
  };
};
