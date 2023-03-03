import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import operations from './relatedProduct.gql';

export const useRelatedProduct = (props) => {
  const { urlKey } = props;
  const { getRelatedProductsQuery } = operations;
  const {
    data: relatedProductData,
    loading: isLoading,
    error: relatedProductError,
  } = useQuery(getRelatedProductsQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    ignore: !urlKey,
    variables: {
      urlKey,
    },
  });
  const relatedProducts = useMemo(() => {
    if (relatedProductData?.products?.items) {
      const foundProduct = relatedProductData.products.items.find((item) => {
        return item.url_key === urlKey;
      });
      if (!foundProduct) {
        return [];
      }
      return foundProduct?.related_products || [];
    }
    return [];
  }, [relatedProductData, urlKey]);
  return {
    relatedProducts,
    isLoading,
  };
};
