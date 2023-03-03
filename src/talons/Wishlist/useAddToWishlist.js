import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import operations from './wishlist.gql';
import Toast from 'react-native-toast-message';
import t from '../../utils/identify';
import { useWishlistContext } from './wishlistContext';
import { useUserContext } from '../../context/user';

export const useAddToWishlist = props => {
  const { product, buildItemPayloads: propBuildPayload } = props;
  const [isAddedWishlist, setIsAddedWishlist] = useState(false);
  const initialization = useRef(true);
  const wishlistIconRef = useRef(null);

  const [{ isSignedIn }] = useUserContext();
  const wlContext = useWishlistContext();
  const [{ customerWishlist }] = wlContext || [{}];

  const { addToWishlistMutation, removeProductsFromWishlistMutation } = operations;
  const [addToWishlist, { data: addWishlistOutput, loading: addWishlistLoading, error: addWishlistError }] =
    useMutation(addToWishlistMutation);
  const [
    removeFromWishlist,
    { data: removeFromWishlistOutput, loading: removeFromWishlistLoading, error: removeFromWishlistError },
  ] = useMutation(removeProductsFromWishlistMutation);

  const buildItemPayloads = useCallback(() => {
    if (propBuildPayload) {
      return propBuildPayload();
    }
    return [
      {
        sku: product.sku,
        quantity: 1,
      },
    ];
  }, []);
  const handleAddToWishlist = useCallback(() => {
    if (!isSignedIn) {
      Toast.show({
        type: 'customWarn',
        text1: t.__('Warning'),
        props: {
          text2: t.__('You need login to add product to your favorite list.'),
        },
        topOffset: 16,
        autoHide: false,
      });
      return;
    }

    const listItems = customerWishlist?.items_v2?.items || [];
    const foundItem = listItems.find(item => item?.product?.sku === product?.sku);
    // console.log({ foundItem });
    if (foundItem) {
      setIsAddedWishlist(false);
      try {
        (async () => {
          await removeFromWishlist({
            variables: {
              wlId: '0',
              wlItemsIds: [foundItem.id],
            },
          });
        })();
      } catch (e) {
        setIsAddedWishlist(true);
      }
      return;
    }
    setIsAddedWishlist(true);

    const sendAddToWishlistApi = async () => {
      await addToWishlist({
        variables: {
          wishlistId: '0',
          wishlistItems: buildItemPayloads(),
        },
      });
    };

    if (!isAddedWishlist) {
      sendAddToWishlistApi();
      return;
    }
  }, [isAddedWishlist, buildItemPayloads, isSignedIn, customerWishlist]);

  useEffect(() => {
    // Init by customer wislish detailt
    if (initialization.current) {
      const listItems = customerWishlist?.items_v2?.items;
      if (typeof listItems === 'undefined') {
        // console.log('NOT FETCH YETT');
        return;
      }
      const foundItem = listItems.find(item => item?.product?.sku === product?.sku);
      // console.log({ foundItem });
      if (!foundItem) {
        // wishlistIconRef.current.play(1, 0);
        // setIsAddedWishlist(false);
      } else {
        wishlistIconRef.current.play(69, 69);
        setIsAddedWishlist(true);
      }
      initialization.current = false;
    }
  }, [customerWishlist]);

  useEffect(() => {
    // console.log({ isAddedWishlist });
    // console.log({ init: initialization.current });
    if (initialization.current) {
      if (isAddedWishlist) {
        wishlistIconRef.current.play(69, 69);
      }
    } else {
      if (!isAddedWishlist) {
        wishlistIconRef.current.play(54, 0);
      } else {
        wishlistIconRef.current.play(0, 83);
      }
    }
  }, [isAddedWishlist]);

  // useEffect(() => {
  //   const listItems = customerWishlist?.items_v2 || [];
  //   const foundItem = listItems.find((item) => item?.product?.sku === product?.sku);
  //   if (foundItem?.id) {
  //     setIsAddedWishlist(true);
  //   }
  // }, [customerWishlist]);

  useEffect(() => {
    // console.log({ addWishlistOutput, addWishlistError });
    if (addWishlistError) {
      Toast.show({
        type: 'customError',
        text1: t.__('Error'),
        props: {
          text2: addWishlistError.message,
        },
        topOffset: 16,
        autoHide: false,
      });
      setIsAddedWishlist(false);
    }
  }, [addWishlistOutput, addWishlistError]);

  useEffect(() => {
    if (removeFromWishlistError) {
      Toast.show({
        type: 'customError',
        text1: t.__('Error'),
        props: {
          text2: removeFromWishlistError.message,
        },
        topOffset: 16,
        autoHide: false,
      });
      setIsAddedWishlist(true);
    }
  }, [removeFromWishlistError]);

  useEffect(() => {
    return () => {
      initialization.current = true;
    };
  }, []);

  return {
    wishlistIconRef,
    handleAddToWishlist,
    isLoading: addWishlistLoading,
  };
};
