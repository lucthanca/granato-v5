import React from 'react';
import ProductFullDetails from './productFullDetails';
import WishlistContextProvider from '../../talons/Wishlist/wishlistContext';

const ProductFullDetailsContextWrapped = props => {
  // console.log({ asdasd: props.navigation });
  return (
    <WishlistContextProvider>
      <ProductFullDetails {...props} />
    </WishlistContextProvider>
  );
};
export default ProductFullDetailsContextWrapped;
