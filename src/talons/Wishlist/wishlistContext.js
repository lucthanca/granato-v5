import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import wishlistOperations from './wishlist.gql';
import { useUserContext } from '../../context/user';

const WishlistContext = createContext(undefined);

const WishlistContextProvider = ({ children }) => {
  const { getCustomerWishlistQuery } = wishlistOperations;
  const [{ isSignedIn }] = useUserContext();
  const { data: cWlData, error: cWlErr } = useQuery(getCustomerWishlistQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: !isSignedIn,
    variables: {
      id: '0',
    },
  });

  const customerWishlist = useMemo(() => {
    // console.log({ cWlData, cWlErr });
    return cWlData?.customer?.wishlist_v2 || {};
  }, [cWlData, cWlErr]);

  const contextValue = useMemo(() => {
    return [{ customerWishlist }];
  }, [customerWishlist]);

  // useEffect(() => {
  //   console.log({cWlErr});
  // }, [cWlErr]);
  return <WishlistContext.Provider value={contextValue}>{children}</WishlistContext.Provider>;
};

export default WishlistContextProvider;
export const useWishlistContext = () => useContext(WishlistContext);
