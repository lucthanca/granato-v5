import { useCallback, useState, useRef, useMemo } from 'react';

export const useBoxToCart = props => {
  const { product, onQtyChange } = props;
  const [qty, setQty] = useState(1);

  const complexAddCartBoxRef = useRef(null);
  const addCartRef = useRef(null);
  const ref = useRef(null);

  const handleSetQty = useCallback(
    val => {
      setQty(val);
      if (onQtyChange) {
        onQtyChange(val);
      }
    },
    [setQty, onQtyChange],
  );
  const hideQty = useMemo(() => {
    // no need show qty input logic here
    // Hide if product is grouped
    const isGroupedProduct = product?.__typename === 'GroupedProduct';

    return isGroupedProduct;
  }, [product?.__typename]);

  const hasComplexBoxToCart = useMemo(() => {
    const isConfigurable = product?.__typename === 'ConfigurableProduct';

    return isConfigurable;
  }, [product]);

  const handleAddToCart = useCallback(
    e => {
      // console.log('Add to cart neffff');
      if (hasComplexBoxToCart) {
        complexAddCartBoxRef?.current?.open();
        return;
      }
      addCartRef?.current.addToCart();
    },
    [hasComplexBoxToCart],
  );

  return {
    handleSetQty,
    handleAddToCart,
    ref,
    complexAddCartBoxRef,
    hideQty,
    hasComplexBoxToCart,
    addCartRef,
  };
};
