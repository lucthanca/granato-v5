import React, { useCallback, useMemo, useState } from 'react';
// import { useIntl } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';
import defaultOperations from './addToListButton.gql';
import Toast from 'react-native-toast-message';
import { useUserContext } from '../../../context/user';
import { useCartContext } from '../../../context/cart';

const WISHLIST_ID_DEFAULT = '0';

export const useWishlist = props => {
  const { item = {} } = props;
  const [{ isSignedIn }] = useUserContext();
  const [{ cartId }] = useCartContext();
  const [product, setProduct] = React.useState(null);
  const [wishlistItem, setWishlistItem] = React.useState(null);
  const operations = defaultOperations;

  const [addProductToWishlist, { data: addProductData, error: errorAddingProduct, loading: isAddingToWishlist }] = useMutation(
    operations.addProductToWishlistMutation,
  );

  const [
    addSimpleProductToCart,
    { data: addSimpleProductToCartData, error: addSimpleProductToCartError, loading: addSimpleProductToCartLoading },
  ] = useMutation(operations.addSimpleProductToCartMutation);

  React.useMemo(() => {
    if (!addSimpleProductToCartData && !addSimpleProductToCartLoading && product) {
      Toast.show({
        type: 'customSuccess',
        props: {
          text2: `Add ${product?.name} to cart successfully.`,
        },
      });
    }
  }, [addSimpleProductToCartData, product]);

  const [removeProductsFromWishlist, { data: removeProductData, error: removeProductProduct, loading: isRemoveProduct }] =
    useMutation(operations.removeProductsFromWishlistMutation);

  // React.useEffect(() => {
  //     console.log("isRemoveProduct: ", isRemoveProduct)
  //     console.log("removeProductData: ", removeProductData)
  //     console.log("removeProductProduct: ", removeProductProduct)
  // }, [removeProductData, removeProductProduct, isRemoveProduct])

  const {
    data: customerWishlistProducts,
    error: errorCustomerWishlistProducts,
    loading: loadingCustomerWishlistProducts,
  } = useQuery(operations.getProductsInWishlistsQuery, {
    variables: {
      wishlistId: WISHLIST_ID_DEFAULT,
    },
  });

  const handleAddSimpleProductToCart = React.useCallback(
    async product => {
      if (cartId) {
        await addSimpleProductToCart({
          variables: {
            cart_id: cartId,
            sku: product.sku,
          },
          refetchQueries: [
            {
              query: operations.getProductsInWishlistsQuery,
              variables: {
                wishlistId: WISHLIST_ID_DEFAULT,
              },
            },
          ],
        });
      }
    },
    [cartId],
  );

  const isSelected = useMemo(() => {
    let check = false;
    customerWishlistProducts?.customer?.wishlist_v2?.items_v2?.items.map(wishlistItem => {
      if (wishlistItem?.product?.sku == item?.sku) {
        check = true;
        setWishlistItem(wishlistItem);
      }
    });
    return (isSignedIn && check) || isAddingToWishlist;
  }, [customerWishlistProducts, isAddingToWishlist, item?.sku]);

  const handleClick = useCallback(async () => {
    if (!isSignedIn) {
      Toast.show({
        type: 'customError',
        text2: 'Please sign-in to your Account to save items for later.',
      });
    } else {
      try {
        if (!isSelected) {
          await addProductToWishlist({
            variables: { wishlistId: WISHLIST_ID_DEFAULT, sku: item?.sku },
            refetchQueries: [
              {
                query: operations.getProductsInWishlistsQuery,
                variables: {
                  wishlistId: WISHLIST_ID_DEFAULT,
                },
              },
            ],
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [
    addProductToWishlist,
    customerWishlistProducts,
    isSignedIn,
    item,
    isSelected,
    operations.getProductsInWishlistsQuery,
    WISHLIST_ID_DEFAULT,
  ]);

  const handleRemoveProductFromWishlist = React.useCallback(
    async (wishlistItem = null) => {
      if (isSignedIn) {
        if (wishlistItem) {
          setProduct(wishlistItem);
          await removeProductsFromWishlist({
            variables: { wishlistId: WISHLIST_ID_DEFAULT, wishlistItemId: wishlistItem.id },
            refetchQueries: [
              {
                query: operations.getProductsInWishlistsQuery,
                variables: {
                  wishlistId: WISHLIST_ID_DEFAULT,
                },
              },
            ],
          });
        } else {
          await removeProductsFromWishlist({
            variables: { wishlistId: WISHLIST_ID_DEFAULT, wishlistItemId: wishlistItem?.id },
            refetchQueries: [
              {
                query: operations.getProductsInWishlistsQuery,
                variables: {
                  wishlistId: WISHLIST_ID_DEFAULT,
                },
              },
            ],
          });
        }
      }
    },
    [removeProductsFromWishlist, isSignedIn, wishlistItem, WISHLIST_ID_DEFAULT, operations.getProductsInWishlistsQuery],
  );

  const successToastProps = useMemo(() => {
    if (addProductData) {
      Toast.show({
        type: 'customSuccess',
        text1: `Add success ${item?.name} to wishlist`,
      });
    }
    return null;
  }, [addProductData]);

  const errorToastProps = useMemo(() => {
    if (errorAddingProduct) {
      console.log('errorAddingProduct: ', errorAddingProduct);
      Toast.show({
        type: 'customError',
        text1: "'Something went wrong adding the product to your wishlist.'",
      });
    }
    return null;
  }, [errorAddingProduct]);

  const wishlistsData = React.useMemo(() => {
    return isSignedIn ? customerWishlistProducts?.customer?.wishlist_v2?.items_v2?.items : null;
  }, [customerWishlistProducts]);

  const isLoading = React.useMemo(() => {
    return loadingCustomerWishlistProducts || isAddingToWishlist || addSimpleProductToCartLoading || isRemoveProduct;
  }, []);

  return {
    handleClick,
    isSelected,
    handleRemoveProductFromWishlist,
    wishlistsData,
    loading: loadingCustomerWishlistProducts,
    handleAddSimpleProductToCart,
    isLoading,
  };
};
