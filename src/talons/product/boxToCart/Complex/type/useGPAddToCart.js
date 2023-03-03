import { useImperativeHandle, useRef } from 'react';

export const useGPAddToCart = (props, ref) => {
  const { product } = props;
  const { grouped_items: groupedItems = [] } = product;

  const itemRefs = useRef([]);
  useImperativeHandle(
    ref,
    () => ({
      buildCartItems: () => {
        const cartItems = [];
        itemRefs.current.every((iRef) => {
          const cartItem = iRef.createCartItem();
          if (cartItem) {
            cartItems.push(cartItem);
          }
          return true;
        });
        return cartItems;
      },
      reset: () => {
        itemRefs.current.every((iRef) => {
          iRef.resetQty();
          return true;
        });
      },
    }),
    []
  );
  return {
    groupedItems,
    itemRefs,
  };
};
