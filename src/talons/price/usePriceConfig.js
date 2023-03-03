import { useQuery } from '@apollo/client';
import { GET_PRICE_CONFIG } from './usePriceConfig.gql';

export const usePriceConfig = () => {
  const { data, loading, error } = useQuery(GET_PRICE_CONFIG);

  // const data = {
  //   storeConfig: {
  //     tax_display_in_catalog: 3,
  //     tax_display_shipping_prices: 3
  //   }
  // };
  return {
    config: data?.storeConfig,
    error,
    loading,
  };
};
