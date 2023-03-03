import { useQuery } from '@apollo/client';
import operations from './upsellProduct.gql';
import { useMemo } from 'react';
export const useUpsellProduct = (props) => {
  const { urlKey } = props;
  const { getUpsellProductsQuery } = operations;
  const {
    data: products,
    loading: productLoading,
    error: productError,
  } = useQuery(getUpsellProductsQuery, { fetchPolicy: 'cache-and-network', nextFetchPolicy: 'cache-first', skip: !urlKey, variables: { urlKey } });
  const upsellProducts = useMemo(() => {
    if (products?.products?.items) {
      const foundProduct = products.products.items.find((item) => {
        return item.url_key === urlKey;
      });
      if (!foundProduct) {
        return [];
      }
      return foundProduct?.upsell_products || [];
    }
    return [];
  }, [products, urlKey]);
  return {
    upsellProducts,
    isLoading: productLoading,
  };
};
