import { useMemo, useImperativeHandle, useRef, useCallback } from 'react';
import { useCatalogTaxPriceConfig } from '../../../../../storeConfig/useCatalogTaxPriceConfig';

export const useGPItem = (props, ref) => {
  const { item = {} } = props;
  const { product } = item;
  // console.log(product);
  const priceConfig = useCatalogTaxPriceConfig();

  const qtyRef = useRef(null);
  const priceRef = useRef(null);
  const onQtyChange = useCallback(newQty => {
    priceRef?.current?.setQty(newQty);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      createCartItem: () => {
        const quantity = qtyRef.current.getQty();
        if (!quantity || quantity == 0) {
          return undefined;
        }
        return {
          quantity,
          sku: product.sku,
        };
      },
      resetQty: () => {
        qtyRef.current.setQty('0');
      },
    }),
    [product?.sku],
  );
  return {
    productPrice: product?.price_range?.maximum_price,
    priceTiers: product?.price_tiers?.filter(
      tierP => tierP.final_price.value < product?.price_range?.maximum_price?.final_price?.value,
    ),
    priceConfig,
    product,
    qtyRef,
    priceRef,
    onQtyChange,
  };
};
