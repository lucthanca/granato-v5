import React from 'react';
import ProductFullDetails from './productFullDetails';
import WishlistContextProvider from '../../talons/Wishlist/wishlistContext';

const ProductFullDetailsContextWrapped = props => {
  console.log('runn herere');
  return <WishlistContextProvider>{/*<ProductFullDetails />*/}</WishlistContextProvider>;
};
export default ProductFullDetailsContextWrapped;
