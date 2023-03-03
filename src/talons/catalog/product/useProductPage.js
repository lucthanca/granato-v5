import { useMemo, useCallback, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import operations from './useProductPage.gql';
import mapProduct from '../../../utils/mapProduct';
// import { useUserContext} from '../../../lib/context/user';

import { useCatalogTaxPriceConfig } from '../../storeConfig/useCatalogTaxPriceConfig';
import Identify from '../../../utils/identify';

export const useProductPage = props => {
  // urlKey configurable; r-vo-d-ch-vay-ti-u-thu-tr-ng-tr-vai-d-m-xoe-babydoll-m-c-nhi-u-ki-u-hot
  // urlKey grouped; set-of-sprite-yoga-straps
  const { urlKey = 'set-of-sprite-yoga-straps' } = props;
  // console.log({ urlKey });
  const priceConfig = useCatalogTaxPriceConfig();
  const [syncQty, setSyncQty] = useState(null);
  const specialRendererRef = useRef(null);

  const { getProductDetailsQuery } = operations;
  const {
    data: productQueryData,
    loading: productQueryLoading,
    error: productQueryError,
  } = useQuery(getProductDetailsQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      urlKey,
    },
  });

  console.log({ productQueryData, productQueryError, productQueryLoading });
  const product = useMemo(() => {
    // console.log(productQueryData);
    if (!productQueryData) {
      // The product isn't in the cache, and we don't have a response from GraphQL yet.
      return null;
    }

    // Only return the product that we queried for.
    // console.log({ urlKey });
    const foundProduct = productQueryData.products.items.find(item => {
      // console.log({ itemUrl: item.url_key });
      return item.url_key === urlKey;
    });
    if (!foundProduct) {
      return null;
    }
    return mapProduct(foundProduct);
  }, [productQueryData, urlKey]);

  const minimumPrice = useMemo(() => {
    const maxFinalP = product?.price_range?.maximum_price?.final_price?.value;
    const minFinalP = product?.price_range?.minimum_price?.final_price?.value;
    if (maxFinalP > minFinalP) {
      return product?.price_range?.minimum_price;
    }
  }, [product]);

  const hidePrice = useMemo(() => {
    // no need show price logic here
    // Hide if product is grouped
    const isGroupedProduct = product?.__typename === 'GroupedProduct';

    return isGroupedProduct;
  }, [product?.__typename]);

  const onAddToCartSuccess = useCallback(() => {
    if (typeof specialRendererRef?.current?.reset === 'function') {
      specialRendererRef.current.reset();
    }
  }, []);

  const minimumPriceText = useMemo(() => {
    switch (product?.__typename) {
      case 'GroupedProduct':
        return Identify.__('Starting at');
      case 'ConfigurableProduct':
        return Identify.__('As low as');
      default:
        return undefined;
    }
  }, []);

  return {
    product,
    productQueryLoading,
    priceConfig,
    productFinalPrice: product?.price_range?.maximum_price,
    minimumPrice,
    setSyncQty,
    syncQty,
    hidePrice,
    specialRendererRef,
    onAddToCartSuccess,
    minimumPriceText,
  };
};
