import React, { forwardRef, memo } from 'react';
import FastImage from 'react-native-fast-image';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import mergeStyles from '../../../../../utils/mergeStyles';
import defaultStyles from './imagePreview.style';
import { useImagePreview } from '../../../../../talons/product/boxToCart/Complex/useImagePreview';
import { array } from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';
// import ImageViewer from 'react-native-image-zoom-viewer';

const ImagePreview = (props, ref) => {
  const { baseImages, previewRef } = props;
  const styles = mergeStyles(defaultStyles, props.style);
  const talonProps = useImagePreview({ baseImages, ref });
  const { imageBase, imageLoading, handleImageStartLoading, handleImageLoadingDone, finalImages } = talonProps;

  console.log('Render small preview');
  return (
    <View style={[styles.root]}>
      {imageLoading && (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      )}

      {/*{listImages?.length > 1 && (*/}
      {/*  <ImageViewer*/}
      {/*    imageUrls={listImages?.map((i) => ({ url: i.url }))}*/}
      {/*    renderIndicator={() => null}*/}
      {/*    onChange={(ind) => (ref.current = ind)}*/}
      {/*    backgroundColor={'transparent'}*/}
      {/*    saveToLocalByLongPress={false}*/}
      {/*    style={{ width: '100%', height: '100%', loadingContainer: { borderWidth: 2, borderColor: 'red'} }}*/}
      {/*    enableImageZoom={false}*/}
      {/*    enablePreload={true}*/}
      {/*  />*/}
      {/*)}*/}

      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        source={{ uri: imageBase.url }}
        style={styles.image}
        onLoadStart={handleImageStartLoading}
        onLoadEnd={handleImageLoadingDone}
      />
      {!imageLoading && (
        <TouchableOpacity
          style={[styles.fullScreenViewIcon]}
          onPress={() => previewRef?.current?.display(finalImages, 0)}
          activeOpacity={0.75}>
          <Icon name="resize-full-screen" color="rgba(255,255,255,1)" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(forwardRef(ImagePreview));

ImagePreview.propTypes = {
  baseImages: array.isRequired,
};
