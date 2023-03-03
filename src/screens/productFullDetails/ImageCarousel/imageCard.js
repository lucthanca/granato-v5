import React from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { withAnchorPoint } from '../../../utils/anchor-point';

const ImageCard = ({ index, animationValue, url, width, height }) => {
  const WIDTH = width / 1.1;
  const HEIGHT = (height ?? width) / 1.1;

  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(animationValue.value, [-0.1, 0, 1], [0.95, 1, 1], Extrapolate.CLAMP);

    const translateX = interpolate(animationValue.value, [-1, -0.2, 0, 1], [0, WIDTH * 0.3, 0, 0]);

    const transform = {
      transform: [
        { scale },
        { translateX },
        { perspective: 200 },
        {
          rotateY: `${interpolate(animationValue.value, [-1, 0, 0.4, 1], [30, 0, -25, -25], Extrapolate.CLAMP)}deg`,
        },
      ],
    };

    return {
      ...withAnchorPoint(transform, { x: 0.5, y: 0.5 }, { width: WIDTH, height: HEIGHT }),
    };
  }, [index]);

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.Image
        source={{ uri: url }}
        resizeMode="contain"
        style={[
          {
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            width: WIDTH,
            height: HEIGHT,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.5,
            shadowRadius: 8,
          },
          cardStyle,
        ]}
      />

      {/* <Animated.Image
            source={fruitItems[index % 3]}
            style={[
            {
                width: WIDTH * 0.8,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                zIndex: 999,
            },
            blockStyle,
            ]}
            resizeMode={"contain"}
        /> */}
    </Animated.View>
  );
};

export default ImageCard;
