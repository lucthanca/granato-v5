import React, { useCallback, useEffect, useMemo } from 'react';
import { View, Dimensions } from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
import Constants from '../../constants';
import IndicatorFullImage from './indicatorFullImage';
import { array } from 'prop-types';

const NUMBER_IMAGE_INDICATOR = 4;
const { height } = Dimensions.get('window');

Gallery.propTypes = {
  images: array,
};

function Gallery(props) {
  const images = props?.route?.params?.images;
  // console.log(images);
  const MAIN_CAROUSEL_HEIGHT = height - 98; // 70% of h
  const DEFAULT_INDEX = 0;
  const [indicatorRef, setIndicatorRef] = React.useState();
  const [selectedI, selectI] = React.useState(DEFAULT_INDEX);
  const [currentIndicatorI, setIndicatorI] = React.useState(DEFAULT_INDEX);
  const handlePressImage = useCallback(i => {
    selectI(i);
  }, []);

  useEffect(() => {
    if (indicatorRef && (selectedI >= currentIndicatorI + NUMBER_IMAGE_INDICATOR || selectedI < currentIndicatorI)) {
      indicatorRef.scrollToIndex({ index: selectedI, animated: true });
      setIndicatorI(selectedI);
    }
  }, [indicatorRef, selectedI, images, currentIndicatorI]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: MAIN_CAROUSEL_HEIGHT }}>
        <ImageViewer
          renderIndicator={() => null}
          handleLongPress={image => {
            // console.log({ image });
          }}
          onChange={handlePressImage}
          index={selectedI}
          backgroundColor={'transparent'}
          imageUrls={useMemo(() => {
            return images.map(img => ({ url: img.url }));
          }, [images])}
          saveToLocalByLongPress={false}
        />
        <View style={{ height: 'auto', paddingTop: 10, paddingBottom: 10, backgroundColor: Constants.color.gray.lightest }}>
          <IndicatorFullImage
            images={images}
            handlePressImage={handlePressImage}
            setRef={setIndicatorRef}
            selectedImageIndex={selectedI}
          />
        </View>
      </View>
      {/* <Carousel*/}
      {/*   pagingEnabled={true}*/}
      {/*   loop={false}*/}
      {/*   autoPlay={false}*/}
      {/*   style={{ width, height: MAIN_CAROUSEL_HEIGHT }}*/}
      {/*   width={width}*/}
      {/*   data={images}*/}
      {/*   renderItem={({ index }) => <SBItem key={index} index={index} url={images[index].url} style={itemStyle} />}*/}
      {/*   scrollAnimationDuration={1300}*/}
      {/* />*/}
    </View>
  );
}

export default Gallery;
