import React, { forwardRef, memo } from 'react';
import defaultStyles from './addToCartBtn.style';
import { Text, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import mergeStyles from '../../../../utils/mergeStyles';
import { useAddToCartBtn } from '../../../../talons/catalog/product/boxToCart/useAddToCartBtn';
import t from '../../../../utils/identify';
import { func, string, bool } from 'prop-types';

const AddToCartBtn = (props, ref) => {
  const {
    handleAddToCart: propHandleAddCart,
    buildCartItems,
    onAddToCartSuccess,
    onAddToCartError,
    action,
    canAddCart,
    addToCartSuccessMessage,
  } = props;
  const styles = mergeStyles(defaultStyles, props.style);
  console.log({ addToCartStyle: props.style, styles });
  const talonProps = useAddToCartBtn({
    ref,
    buildCartItems,
    onAddToCartSuccess,
    onAddToCartError,
    action,
    canAddCart,
    addToCartSuccessMessage,
  });
  const {
    canAddCart: talonCanAddCart,
    addCartIconRef,
    onAnimationDone,
    handleAddToCart: defaultHandler,
    isAdded,
    isLoading,
  } = talonProps;
  console.log('RENDER: Add To Cart BUTTON');
  return (
    <TouchableOpacity
      disabled={!talonCanAddCart}
      activeOpacity={0.7}
      onPress={propHandleAddCart ? propHandleAddCart : defaultHandler}
      style={[styles.addToCartButton, !talonCanAddCart ? styles.addToCartButtonDisabled : {}]}>
      {!talonCanAddCart && (
        <LottieView
          source={require('../../../../assets/lottie-animated-icons/add-to-cart-disabled.json')}
          style={styles.addToCartAnimIcon}
        />
      )}
      {talonCanAddCart && (
        <LottieView
          ref={addCartIconRef}
          source={require('../../../../assets/lottie-animated-icons/add-to-cart-success2.json')}
          style={styles.addToCartAnimIcon}
          onAnimationFinish={onAnimationDone}
          loop={false}
          duration={2000}
        />
      )}
      {isAdded && <Text style={styles.addToCartText}>{t.__('Added!')}</Text>}
      {isLoading && !isAdded && <Text style={styles.addToCartText}>{t.__('Adding...')}</Text>}
      {!isLoading && (
        <Text style={[styles.addToCartText, !talonCanAddCart ? styles.addToCartTextDisabled : {}]}>{t.__('Add to Cart')}</Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(forwardRef(AddToCartBtn));

AddToCartBtn.propTypes = {
  buildCartItems: func.isRequired,
  onAddToCartSuccess: func,
  onAddToCartError: func,
  handleAddToCart: func,
  action: string,
  canAddCart: bool,
  addToCartSuccessMessage: string,
};

AddToCartBtn.defaultProps = {
  action: 'add',
};
