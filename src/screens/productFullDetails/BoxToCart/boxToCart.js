import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { func, object } from 'prop-types';
// import Constants from '@helper/constants';
import Qty from './qty';
// import Icon from 'react-native-vector-icons/EvilIcons';
import { useBoxToCart } from '../../../talons/catalog/product/boxToCart/useBoxToCart';
import mergeStyles from '../../../utils/mergeStyles';
import DEFAULT_STYLES from './boxToCart.style';

// import Animated, { useSharedValue } from 'react-native-reanimated';
// import LottieView from 'lottie-react-native';

const BoxToCartComplex = React.lazy(() => import('./Complex/boxToCartComplex'));
import AddToCartBtn from './AddToCartBtn';
import LoadingIndicator from '../../../components/Spinner/loadingIndicator';

const BoxToCart = props => {
  const { product, propStyles = {}, onQtyChange, buildCartItems, onAddToCartSuccess } = props;
  const style = StyleSheet.create(mergeStyles(DEFAULT_STYLES, propStyles));
  const talonProps = useBoxToCart({ product, onQtyChange });
  const { handleAddToCart, ref, handleSetQty, complexAddCartBoxRef, hideQty, hasComplexBoxToCart, addCartRef } = talonProps;
  let addToCartStyle = {};
  if (!hideQty) {
    addToCartStyle = {
      addToCartButton: {
        marginLeft: 14,
      },
    };
  }
  return (
    <View style={style.root}>
      {!hideQty && <Qty initValue={1} setQty={handleSetQty} />}
      <AddToCartBtn
        ref={addCartRef}
        buildCartItems={buildCartItems}
        canAddCart={true}
        handleAddToCart={handleAddToCart}
        onAddToCartSuccess={onAddToCartSuccess}
        style={addToCartStyle}
      />

      {hasComplexBoxToCart && (
        <React.Suspense fallback={<LoadingIndicator />}>
          <BoxToCartComplex product={product} onQtyChange={qty => ref.current.setQty(qty)} sheetRef={complexAddCartBoxRef} />
        </React.Suspense>
      )}
    </View>
  );
};

export default BoxToCart;

BoxToCart.propTypes = {
  product: object.isRequired,
  buildCartItems: func.isRequired,
  onAddToCartSuccess: func,
};
