import React from 'react';
import { TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { useAddToWishlist } from '../../talons/Wishlist/useAddToWishlist';
import mergeStyles from '../../utils/mergeStyles';
import defaultStyles from './addToWishlist.style';
import { object } from 'prop-types';
const AddToWishlist = props => {
  const { style: propStyle, ...rest } = props;
  const styles = mergeStyles(defaultStyles, props.style);
  const talonProps = useAddToWishlist(rest);
  const { wishlistIconRef, handleAddToWishlist, isLoading } = talonProps;
  // console.log('RENDER, add to wishlist button');
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={handleAddToWishlist} disabled={isLoading}>
      <LottieView
        loop={false}
        source={require('../../assets/lottie-animated-icons/27271-like-animation.json')}
        ref={wishlistIconRef}
        style={styles.wishlistIcon}
      />
    </TouchableOpacity>
  );
};

export default React.memo(AddToWishlist);
AddToWishlist.propTypes = {
  product: object,
  customerWishlist: object,
};
