import React, { useCallback, useMemo, useEffect } from 'react';
// import { useIntl } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';
import operations from './useOrders.gql';

export const useOrders = props => {
  const { getOrders } = operations;
  const { data, loading, error } = useQuery(getOrders);

  useEffect(() => {
    // console.log("error: ", error);
  }, [error]);

  const orders = useMemo(() => {
    return data && data.customer.orders.total_count > 0 ? data.customer.orders.items : [];
  }, [data]);

  return {
    orders,
    loading,
  };
};
