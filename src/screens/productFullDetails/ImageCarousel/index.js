import React, { useCallback } from 'react';
import { View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
const { width } = Dimensions.get('window');
import PaginationItem from './item';
import Constants from '../../../constants';
import Carousel from 'react-native-reanimated-carousel';
const ImageCard = React.lazy(() => import('./imageCard'));

import { useNavigation } from '@react-navigation/native';
import LoadingIndicator from '../../../components/Spinner/loadingIndicator';
const WRAPPER_PADDING = Constants.alignSize[2];
const CAROUSEL_WRAPPER_PADDING = Constants.alignSize[2];

const Images = props => {
  const { images } = props;
  const progressValue = useSharedValue(0);
  const navigation = useNavigation();
  const filteredImages = images.filter(i => !i.disabled);
  const byPosition = (f, l) => f.position - l.position;
  const sortedImages = filteredImages.sort(byPosition);

  const baseOptions = {
    vertical: false,
    width: width - WRAPPER_PADDING * 2 - CAROUSEL_WRAPPER_PADDING * 2,
    height: width - WRAPPER_PADDING * 2 - CAROUSEL_WRAPPER_PADDING * 2,
  };

  const handlePressImage = useCallback(() => {
    navigation.navigate('ProductGallery', { images: sortedImages });
  }, [navigation, sortedImages]);

  return (
    <TouchableWithoutFeedback onPress={handlePressImage}>
      <View
        style={{
          backgroundColor: Constants.color.white.normal,
          borderWidth: 1,
          borderRadius: Constants.borderRadius.xs,
          borderColor: Constants.color.gray.lighter,
          paddingTop: CAROUSEL_WRAPPER_PADDING * 1.5,
          paddingBottom: CAROUSEL_WRAPPER_PADDING * 1.5,
          paddingLeft: CAROUSEL_WRAPPER_PADDING,
          paddingRight: CAROUSEL_WRAPPER_PADDING,
          alignItems: 'center',
        }}>
        <Carousel
          {...baseOptions}
          loop={true}
          autoPlay={false}
          withAnimation={{
            type: 'spring',
            config: {
              damping: 13,
            },
          }}
          onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
          autoPlayInterval={1500}
          data={sortedImages}
          renderItem={({ index, animationValue }) => (
            <React.Suspense fallback={<LoadingIndicator />}>
              <ImageCard
                animationValue={animationValue}
                key={index}
                index={index}
                url={sortedImages[index].url}
                width={width - WRAPPER_PADDING * 2 - CAROUSEL_WRAPPER_PADDING * 2}
              />
            </React.Suspense>
          )}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: Constants.alignSize[1],
          }}>
          {sortedImages.map((im, index) => {
            return (
              <PaginationItem
                backgroundColor={Constants.color['blue-sky'].normal}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={false}
                length={sortedImages.length}
                style={{ marginLeft: index === 0 ? 0 : Constants.alignSize[2] }}
                notSelectedColor={Constants.color.gray.lighter}
              />
            );
          })}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Images;
