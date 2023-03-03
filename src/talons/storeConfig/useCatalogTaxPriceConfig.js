import { usePriceConfig } from '../price/usePriceConfig';
import { useMemo } from 'react';

export const useCatalogTaxPriceConfig = () => {
  const { config, loading: configLoading, error: configError } = usePriceConfig();

  const taxDisplayType = useMemo(() => {
    if (config?.tax_display_in_catalog) {
      return config.tax_display_in_catalog;
    }
    return 1;
  }, [config]);

  return {
    taxDisplayType,
    configLoading,
    configError,
  };
};
