import { useCallback, useImperativeHandle, useRef } from 'react';

export const useCPAddToCart = (props) => {
  const { ref, product, imagePreviewRef, whenAvailableAddToCart, qtyRef } = props;
  const { variants: productVariants, configurable_options: configurableOptions } = product;
  const selectedOptionsRef = useRef({});
  const cachedChildProduct = useRef();
  // const [selectedOptions, selectOptions] = useState({});

  const getChildProduct = useCallback(() => {
    if (!cachedChildProduct.current) {
      if (Object.keys(selectedOptionsRef.current).length === 0) {
        cachedChildProduct.current = undefined;
      }
    }
    const founded = productVariants.find((variant) => {
      const { attributes } = variant;
      let matchAttributes = 0;
      Object.keys(selectedOptionsRef.current).every((code) => {
        const foundAttribute = attributes.find((attribute) => attribute.uid === selectedOptionsRef.current[code]);
        if (foundAttribute) {
          matchAttributes++;
          return true;
        }
        return false;
      });
      // console.log(selectedOptions, matchAttributes);
      return matchAttributes === attributes.length;
    });
    cachedChildProduct.current = founded?.product;
    return cachedChildProduct.current;
  }, [productVariants]);

  const isValidAddToCart = useCallback(() => {
    return Object.keys(selectedOptionsRef.current).length === configurableOptions.length || getChildProduct()?.sku;
  }, [configurableOptions, getChildProduct]);

  const performWhenUnavailableAddCart = useCallback(() => {
    if (isValidAddToCart()) {
      return;
    }
    imagePreviewRef?.current?.setDisplayImages([]);
    if (whenAvailableAddToCart) {
      whenAvailableAddToCart(false);
    }
  }, [isValidAddToCart, imagePreviewRef, whenAvailableAddToCart]);

  const performWhenAvailableAddCart = useCallback(() => {
    // console.log({ sdsada: selectedOptionsRef.current });
    if (!isValidAddToCart()) {
      return;
    }
    imagePreviewRef?.current?.setDisplayImages(getChildProduct()?.media_gallery || []);
    if (whenAvailableAddToCart) {
      whenAvailableAddToCart(true);
    }
  }, [isValidAddToCart, getChildProduct, imagePreviewRef, whenAvailableAddToCart]);

  const handleSelectedOption = useCallback(
    (option) => {
      const { code, value } = option;
      const current = selectedOptionsRef.current;
      // Unselect value
      if (current[code] === value) {
        const copy = { ...current };
        delete copy[code];
        selectedOptionsRef.current = copy;
      } else {
        selectedOptionsRef.current = { ...current, [code]: value };
      }

      // Reset cached child product
      cachedChildProduct.current = undefined;

      performWhenUnavailableAddCart();
      performWhenAvailableAddCart();
    },
    [getChildProduct, imagePreviewRef, configurableOptions, whenAvailableAddToCart, isValidAddToCart]
  );

  useImperativeHandle(
    ref,
    () => ({
      selectOption: (option) => {
        handleSelectedOption(option);
      },
      buildCartItems: () => {
        return [
          {
            quantity: qtyRef.current.getQty(),
            sku: product.sku,
            selected_options: Object.values(selectedOptionsRef.current),
          },
        ];
      },
      getSelectedChildProduct: () => {
        return cachedChildProduct.current;
      },
    }),
    [handleSelectedOption, qtyRef, product]
  );

  return {
    configurableOptions,
    handleSelectedOption,
  };
};
