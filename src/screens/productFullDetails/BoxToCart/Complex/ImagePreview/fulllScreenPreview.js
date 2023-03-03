import React, { memo, forwardRef } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import ImageViewer from 'react-native-image-zoom-viewer';
import mergeStyles from '../../../../../utils/mergeStyles';
import { object } from 'prop-types';
import defaultStyles from './fullScreenPreview.style';
import { useFullScreenView } from '../../../../../talons/product/boxToCart/Complex/useFullScreenView';
import Icon from 'react-native-vector-icons/AntDesign';

const FullScreenPreview = (props, ref) => {
  const styles = mergeStyles(defaultStyles, props.style);
  const talonProps = useFullScreenView({ ref });
  const { imageUrls, isOpen, handleCloseTrashPopup, animatedStyle, selectIndex } = talonProps;
  return (
    <Animated.View style={[styles.imageFullView, animatedStyle]}>
      {isOpen && (
        <ImageViewer
          backgroundColor={'transparent'}
          imageUrls={imageUrls}
          saveToLocalByLongPress={false}
          index={selectIndex}
          renderIndicator={imageUrls.length > 1 ? undefined : () => null}
        />
      )}
      <TouchableOpacity onPress={handleCloseTrashPopup} style={styles.closeIconWrapper} activeOpacity={0.65}>
        <Icon name="close" style={styles.closeIcon} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(forwardRef(FullScreenPreview));
FullScreenPreview.propTypes = {
  style: object,
};
