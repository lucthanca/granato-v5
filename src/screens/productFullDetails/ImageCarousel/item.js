import React from 'react';
import { View } from 'react-native';
import Constants from '../../../constants';
import Animated, { Extrapolate, useAnimatedStyle, interpolate } from 'react-native-reanimated';

const PaginationItem = props => {
  const { animValue, index, length, backgroundColor, isRotate, style, notSelectedColor } = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(animValue?.value, inputRange, outputRange, Extrapolate.CLAMP),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: notSelectedColor,
        width,
        aspectRatio: 1,
        borderRadius: Constants.borderRadius.rounded,
        overflow: 'hidden',
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
        ...style,
      }}>
      <Animated.View
        style={[
          {
            borderRadius: Constants.borderRadius.rounded,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default PaginationItem;
