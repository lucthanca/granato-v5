import React from 'react';
// import ProductFullDetails from './productFullDetails';
import WishlistContextProvider from '../../talons/Wishlist/wishlistContext';
import LoadingIndicator from '../../components/Spinner/loadingIndicator';

const ProductFullDetails = React.lazy(() => import('./productFullDetails'));

const ProductFullDetailsContextWrapped = props => {
  // console.log({ asdasd: props.navigation });
  return (
    <WishlistContextProvider>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ProductFullDetails {...props} />
      </React.Suspense>
    </WishlistContextProvider>
  );
};
export default ProductFullDetailsContextWrapped;
