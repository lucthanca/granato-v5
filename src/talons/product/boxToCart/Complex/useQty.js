import { useRef, useImperativeHandle, useCallback, useState, useEffect } from 'react';

export const useQty = (props) => {
  const { ref, initQty, onQtyChange } = props;
  const inputRef = useRef(null);
  const [qty, setQty] = useState(initQty);

  useEffect(() => {
    if (onQtyChange) {
      onQtyChange(qty);
    }
  }, [onQtyChange, qty]);

  const handleQtyChange = useCallback(
    (v) => {
      const filteredQty = v.replace(/[^0-9.]+/g, '');
      setQty(filteredQty);
    },
    [setQty]
  );

  const handleOnEndEditing = useCallback(
    (e) => {
      if (e.nativeEvent.text === '' || Number(e.nativeEvent.text) < 0) {
        setQty(initQty);
      }
    },
    [initQty]
  );

  const handleQtyInCrease = useCallback(() => {
    setQty((prev) => Number(prev) + 1);
  }, []);

  const handleQtyDecrease = useCallback(() => {
    setQty((prev) => {
      if (prev === initQty) return;
      return prev - 1;
    });
  }, [initQty]);

  useImperativeHandle(ref, () => ({
    getQty: () => {
      return qty;
    },
    setQty: (vl) => {
      handleQtyChange(vl);
    },
  }));
  return {
    inputRef,
    handleQtyChange,
    qty,
    handleOnEndEditing,
    handleQtyInCrease,
    handleQtyDecrease,
  };
};
