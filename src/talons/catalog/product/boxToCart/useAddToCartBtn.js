import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import operations from './useBoxToCart.gql';
import { Keyboard } from 'react-native';
import { useCartContext } from '../../../../context/cart';
import Toast from 'react-native-toast-message';
import t from '../../../../utils/identify';
const STEP = {
  INIT: 0,
  ADD_TO_CART: 1,
  SHOW_ANIM: 2,
  DONE: 3,
};
export const useAddToCartBtn = props => {
  const {
    ref,
    buildCartItems,
    addToCartSuccessMessage,
    onAddToCartSuccess,
    onAddToCartError,
    action,
    canAddCart: propCanAddCart,
  } = props;
  const [step, setStep] = useState(STEP.INIT);
  const [canAddCart, setCanAddCart] = useState(false);
  const addCartIconRef = useRef(null);
  const [{ cartId }] = useCartContext();
  const { addProductsToCartMutation } = operations;
  const [addProductsToCart, { loading: addToCartLoading, data: addToCartData, error: addToCartError }] =
    useMutation(addProductsToCartMutation);

  const [error, setError] = useState();
  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'customError',
        text1: t.__('Error'),
        props: {
          text2: typeof error === 'object' ? error.message : error,
        },
        topOffset: 16,
        autoHide: false,
        onHide: () => setError(undefined),
      });
    }
  }, [error]);

  useEffect(() => {
    // console.log({ addToCartError, addToCartLoading });
    if (addToCartError && !addToCartLoading) {
      setError(t.__("Can't add product to cart."));
      if (onAddToCartError) {
        onAddToCartError();
      }
    }
  }, [onAddToCartError, addToCartError, addToCartLoading]);

  const handleAddToCart = useCallback(() => {
    setStep(STEP.ADD_TO_CART);
    Keyboard.dismiss();
  }, [setStep]);

  // INIT SET CAN ADD CART STATUS
  useEffect(() => {
    if (propCanAddCart) {
      setCanAddCart(true);
    }
  }, [propCanAddCart]);

  // NOTE: trigger only when step change
  useEffect(() => {
    const buildAndSendRequest = async () => {
      try {
        const cartItems = buildCartItems();
        if (cartItems.length === 0) {
          throw { message: t.__('Please selected required option.') };
        }
        const data = {
          cartId,
          cartItems,
        };
        await addProductsToCart({
          variables: data,
        });
        setStep(STEP.SHOW_ANIM);
      } catch (e) {
        setError(e.message);
        setStep(STEP.INIT);
      }
    };

    if (step === STEP.ADD_TO_CART) {
      buildAndSendRequest();
    }
  }, [step]);

  // NOTE: trigger only when step change
  // When show animation active
  useEffect(() => {
    if (step === STEP.SHOW_ANIM) {
      addCartIconRef?.current?.play();
      Toast.show({
        type: 'customSuccess',
        props: {
          text2: addToCartSuccessMessage || t.__('You added selected product to your shopping cart.'),
        },
        topOffset: 16,
        autoHide: true,
        visibilityTime: 4000,
      });
    }
  }, [step]);

  const onAnimationDone = useCallback(
    isCancelled => {
      // console.log({ eee: isCancelled });
      if (isCancelled) {
        return;
      }
      addCartIconRef?.current?.reset();
      setStep(STEP.INIT);
      if (onAddToCartSuccess) {
        onAddToCartSuccess();
      }
    },
    [setStep, onAddToCartSuccess],
  );

  useImperativeHandle(
    ref,
    () => ({
      addToCart: () => {
        handleAddToCart();
      },
      setCanAddCart: can => {
        // Check for should re-render
        if (canAddCart === can) {
          return;
        }
        // console.log({ can });
        setCanAddCart(can);
      },
    }),
    [canAddCart, handleAddToCart],
  );

  return {
    addCartIconRef,
    handleAddToCart,
    onAnimationDone,
    isLoading: step !== STEP.INIT,
    isAdded: step === STEP.SHOW_ANIM,
    canAddCart,
  };
};
