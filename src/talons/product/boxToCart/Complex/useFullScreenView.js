import { useMemo, useImperativeHandle, useState, useCallback, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const { height: screenHeight } = Dimensions.get('window');
export const useFullScreenView = (props) => {
  const { ref } = props;
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const bottomValue = useSharedValue(screenHeight * -1);
  useImperativeHandle(ref, () => ({
    display: (inputImages, index) => {
      setImages(inputImages);
      setIsOpen(true);
      setSelectIndex(index);
    },
    isOpen: () => {
      return isOpen;
    },
    close: () => {
      handleCloseTrashPopup();
    },
  }));

  useEffect(() => {
    const localHeight = isOpen ? 0 : -1 * screenHeight;
    bottomValue.value = withTiming(localHeight, { duration: 200 });
  }, [isOpen]);

  const handleCloseTrashPopup = useCallback(() => {
    setSelectIndex(0);
    setImages([]);
    setIsOpen(false);
  }, []);
  const imageUrls = useMemo(() => {
    return images?.map((img) => ({ url: img.url }));
  }, [images]);

  const animatedStyle = useAnimatedStyle(() => {
    return { bottom: bottomValue.value };
  });

  return {
    imageUrls,
    isOpen,
    handleCloseTrashPopup,
    animatedStyle,
    selectIndex,
  };
};
