import React, { memo } from 'react';
import { array, func, number } from 'prop-types';
import { FlatList } from 'react-native';
import makeid from '../../utils/makeId';
import SingleImageIndicator from './singleImageIndicator';

const NUMBER_IMAGE_INDICATOR = 4;
const IndicatorFullImage = props => {
  const { images, handlePressImage, setRef, selectedImageIndex } = props;

  return (
    <FlatList
      data={images}
      contentContainerStyle={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      ref={ref => setRef && setRef(ref)}
      keyExtractor={() => makeid()}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      renderItem={({ item, index }) => (
        <SingleImageIndicator
          indicatorNumInPage={NUMBER_IMAGE_INDICATOR}
          isSelected={index === selectedImageIndex}
          handlePressImage={handlePressImage}
          image={item}
          key={index}
          index={index}
        />
      )}
    />
  );
};

export default memo(IndicatorFullImage);

IndicatorFullImage.propTypes = {
  images: array.isRequired,
  handlePressImage: func.isRequired,
  setRef: func,
  selectedImageIndex: number,
};
