import { useState, useImperativeHandle, useCallback, useEffect } from 'react';
import { useAnimatedStyle, interpolate, Extrapolation, useSharedValue, withSpring, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { Dimensions } from 'react-native';

const { height: screenH } = Dimensions.get('window');

export const useBottomSheet = (props) => {
  const { ref, onCloseSheet } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatedDone, setIsAnimatedDone] = useState(false);
  const [startedClose, setStartClose] = useState(false);
  const popupBottom = useSharedValue(0);
  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close(showAnimated = false) {
      if (showAnimated) {
        closeModal(false);
      } else {
        setStartClose(true);
      }
    },
  }));

  useEffect(() => {
    const localHeight = isOpen ? 0 : -1 * screenH;
    popupBottom.value = withSpring(localHeight, { mass: 0.5, stiffness: 170, damping: 14 });
  }, [isOpen]);

  const handleSetIsAnimated = useCallback(() => {
    setIsAnimatedDone(true);
  }, [setIsAnimatedDone]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    setStartClose(true);
  }, []);

  useEffect(() => {
    if (startedClose) {
      popupBottom.value = withTiming(
        -1 * screenH,
        {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        (finished) => {
          if (finished) {
            runOnJS(handleSetIsAnimated)(true);
          }
        }
      );
    }
  }, [startedClose]);

  useEffect(() => {
    if (isAnimatedDone) {
      closeModal();
      setStartClose(false);
      setIsAnimatedDone(false);
      if (onCloseSheet) {
        onCloseSheet();
      }
    }
  }, [closeModal, isAnimatedDone]);

  const popupAnim = useAnimatedStyle(() => {
    return {
      bottom: popupBottom.value,
    };
  }, [popupBottom]);
  const backdropAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(popupBottom.value, [-1 * screenH, 0], [0, 1], { extrapolateRight: Extrapolation.CLAMP }),
    };
  }, [popupBottom]);
  return {
    isOpen,
    handleClose,
    backdropAnim,
    popupAnim,
  };
};
