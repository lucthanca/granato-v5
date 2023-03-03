import { useImperativeHandle, useMemo, useRef, useCallback } from 'react';
import { useCatalogTaxPriceConfig } from '../../../storeConfig/useCatalogTaxPriceConfig';

export const useBoxToCartComplex = props => {
  const { product, ref } = props;
  const qtyRef = useRef(null);
  const previewImgRef = useRef(null);
  const imgRef = useRef(null);
  const productTypeRenderRef = useRef(null);
  const addCartRef = useRef(null);
  const priceRenderRef = useRef(null);

  const priceConfig = useCatalogTaxPriceConfig();

  useImperativeHandle(ref, () => ({}));

  const buildCartItems = useCallback(() => {
    if (typeof productTypeRenderRef?.current?.buildCartItems === 'function') {
      return productTypeRenderRef.current.buildCartItems();
    }
    return undefined;
  }, []);
  const handleSetAvailableToCart = useCallback(
    available => {
      addCartRef?.current.setCanAddCart(available);
      if (typeof productTypeRenderRef?.current?.getSelectedChildProduct === 'function') {
        const selectedProduct = productTypeRenderRef?.current?.getSelectedChildProduct();
        if (!selectedProduct) {
          priceRenderRef?.current?.setPrice({});
          return;
        }
        const price = {
          priceTiers: selectedProduct?.price_tiers,
          finalPrice: selectedProduct?.price_range?.maximum_price,
        };
        priceRenderRef?.current?.setPrice(price);
      }
    },
    [productTypeRenderRef, addCartRef],
  );

  const parentImages = useMemo(() => {
    const { media_gallery } = product;
    if (media_gallery && media_gallery.length > 0) {
      return media_gallery;
    }
    return [];
  }, [product]);
  const parentPrices = useMemo(() => {
    const maxFinalP = product?.price_range?.maximum_price?.final_price?.value;
    const minFinalP = product?.price_range?.minimum_price?.final_price?.value;
    const output = { finalPrice: product?.price_range?.maximum_price };
    if (maxFinalP > minFinalP) {
      output.minimumPrice = product?.price_range?.minimum_price;
    }
    return output;
  }, [product]);

  return {
    displayImages: parentImages,
    parentPrices,
    priceConfig,
    qtyRef,
    fullPreviewImgRef: previewImgRef,
    imgRef,
    productTypeRenderRef,
    buildCartItems,
    addCartRef,
    priceRenderRef,
    handleSetAvailableToCart,
  };
};
