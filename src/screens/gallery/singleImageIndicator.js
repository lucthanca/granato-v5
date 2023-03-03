import React, { memo } from 'react';
import { TouchableHighlight, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import Constants from '../../constants';
import { bool, func, number, object } from 'prop-types';

const SingleImageIndicator = props => {
  const { image, index, handlePressImage, isSelected, indicatorNumInPage } = props;
  const imageWidth = (Dimensions.get('window').width - 50) / indicatorNumInPage;
  return (
    <TouchableHighlight
      onPress={() => {
        handlePressImage(index);
      }}
      style={{ marginLeft: Constants.alignSize[3] }}>
      <FastImage
        style={{
          width: imageWidth,
          aspectRatio: 1,
          overflow: 'hidden',
          borderRadius: Constants.borderRadius.xs,
          backgroundColor: Constants.color.white.normal,
          borderWidth: 2,
          borderColor: isSelected ? Constants.color.primary.normal : 'transparent',
        }}
        resizeMode={FastImage.resizeMode.contain}
        source={{ uri: image.url }}
      />
    </TouchableHighlight>
  );
};

export default memo(SingleImageIndicator);

SingleImageIndicator.propTypes = {
  image: object.isRequired,
  index: number.isRequired,
  handlePressImage: func.isRequired,
  isSelected: bool,
  indicatorNumInPage: number.isRequired,
};
