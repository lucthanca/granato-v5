import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import defaultStyles from './productCart.style';
import mergeStyles from '../../../utils/mergeStyles';
import FastImage from 'react-native-fast-image';
import FinalPrice from '../../../components/Price';
import { useProductCart } from '../../../talons/catalog/product/RelatedProduct/useProductCart';
import AddToWishlist from '../../../components/WishList/addToWishlist';
import { object } from 'prop-types';

const ProductCart = props => {
  const { product } = props;
  const talonProps = useProductCart({ product });
  const { finalPrice, priceConfig, minimumPrice, handlePressProduct } = talonProps;
  const styles = mergeStyles(defaultStyles, props.style);
  // console.log('RENDER product cart');
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.productContainer} onPress={handlePressProduct} activeOpacity={0.65}>
        <View style={styles.pImageContainer}>
          <FastImage
            style={styles.imageNoPadding}
            source={{ uri: product?.small_image?.url }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.wishlistIcon}>
            <AddToWishlist loop={false} product={product} />
          </View>
        </View>
        <View style={styles.productInfo}>
          <Text numberOfLines={2} style={styles.productNameText}>
            {product.name}
          </Text>

          <FinalPrice style={styles.priceBox} finalPrice={finalPrice} config={priceConfig} minimumPrice={minimumPrice} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCart;

ProductCart.propTypes = {
  customerWishlist: object,
};
