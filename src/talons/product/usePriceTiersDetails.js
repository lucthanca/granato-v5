import { useCatalogTaxPriceConfig } from '../storeConfig/useCatalogTaxPriceConfig';

export const usePriceTiersDetails = props => {
  const priceConfig = useCatalogTaxPriceConfig();

  return {
    priceConfig,
  };
};
