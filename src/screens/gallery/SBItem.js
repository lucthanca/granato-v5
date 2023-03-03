import React from "react";
import { StyleProp, ViewStyle, ViewProps } from "react-native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import { AnimateProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import FastImage from 'react-native-fast-image';
import { object, shape } from 'prop-types';
import { Dimensions, Image } from 'react-native';
// SBItem.propTypes = {
//   style: shape({
//     image: object
//   })
// }

export const SBItem = (props) => {
  const { style, index, pretty, testID, url, ...animatedViewProps } = props;
  const enablePretty = true;
  const [isPretty, setIsPretty] = React.useState(pretty || enablePretty);
  const imageSource = {
    uri: url
  }
  console.log(url);
  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}
    >
      <Animated.View testID={testID} style={{ flex: 1, borderWidth: 2 }} {...animatedViewProps}>
        <FastImage
          style={{...style.image}}
          source={imageSource}
          resizeMode={FastImage.resizeMode.contain}
        />

        {/*{isPretty*/}
        {/*  ? (*/}
        {/*    <SBImageItem style={style} index={index} />*/}
        {/*  )*/}
        {/*  : (*/}
        {/*    <SBTextItem style={style} index={index} />*/}
        {/*  )}*/}
      </Animated.View>
    </LongPressGestureHandler>
  );
};