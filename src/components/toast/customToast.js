import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Constants from '../../constants';
import LottieView from 'lottie-react-native';
const { width } = Dimensions.get('window');
const CONTAINER_MARGIN = Constants.alignSize[2];
const CUSTOM_TOAST_HEIGHT = 80;
const CUSTOM_TOAST_WIDTH = width - CONTAINER_MARGIN * 2;
import Animated, { Layout, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const DEFAULT_CUSTOM_ICONS = {
  customSuccess: {
    icon: (
      <LottieView
        source={require('../../assets/lottie-animated-icons/79952-successful.json')}
        autoPlay={true}
        loop={true}
        style={{ width: 48, aspectRatio: 1 }}
      />
    ),
  },
  customError: {
    icon: (
      <View style={{ width: 48, aspectRatio: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={require('../../assets/lottie-animated-icons/4386-connection-error.json')}
          autoPlay={true}
          loop={true}
          style={{ width: 36, aspectRatio: 1 }}
        />
      </View>
    ),
  },
  customInfo: {
    icon: (
      <View style={{ width: 48, aspectRatio: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={require('../../assets/lottie-animated-icons/11202-information.json')}
          autoPlay={true}
          loop={true}
          resizeMode="contain"
          style={{ width: 36, aspectRatio: 1 }}
        />
      </View>
    ),
  },
  customWarn: {
    icon: (
      <View style={{ width: 48, aspectRatio: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={require('../../assets/lottie-animated-icons/15426-warning-animation.json')}
          autoPlay={true}
          loop={true}
          resizeMode="contain"
          style={{ width: 36, aspectRatio: 1 }}
        />
      </View>
    ),
  },
};

const baseCustomConfig = ({ text1, props }, field) => {
  const { icon, text2, customColor } = props;
  // console.log({ props }, { text1 });
  const styles = StyleSheet.create({
    container: {
      width: CUSTOM_TOAST_WIDTH,
      backgroundColor: 'transparent',
      borderRadius: Constants.borderRadius.md,
      marginRight: CONTAINER_MARGIN,
      marginLeft: CONTAINER_MARGIN,
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderWidth: 2,
      borderColor: 'rgba(246,246,246,0.25)',
      borderTopWidth: 0,
      overflow: 'hidden',
      flexDirection: 'column',
      ...Constants.boxShadow.xl,
      shadowColor: customColor || '#000',
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
  const typeIconDefault = DEFAULT_CUSTOM_ICONS?.[field]?.icon || null;

  const animation = useSharedValue(CUSTOM_TOAST_HEIGHT);
  const animationStyle = useAnimatedStyle(() => ({
    height: withTiming(animation.value, { duration: 600 }),
  }));

  // const handleLongPress = useCallback(() => {
  //   // setHeight(pre => pre+ 200);
  //   animation.value = animation.value + 200;
  //   console.log(animation.value);
  // }, [animation]);
  //
  // const handlePressOut = useCallback(() => {
  //
  // }, [animation]);

  return (
    // <TouchableWithoutFeedback onLongPress={handleLongPress} onPressOut={handlePressOut}>
    <Animated.View layout={Layout} style={[animationStyle]}>
      <View style={[styles.container, { height: '100%' }]}>
        {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
        <BlurView
          style={[styles.absolute]}
          blurType="light"
          blurAmount={24}
          reducedTransparencyFallbackColor='rgba(37,42,54,.25)'
        />
        <View
          style={{
            flex: 1,
            paddingTop: CONTAINER_MARGIN,
            paddingLeft: CONTAINER_MARGIN,
            paddingBottom: CONTAINER_MARGIN,
            paddingRight: CONTAINER_MARGIN,
            maxWidth: CUSTOM_TOAST_WIDTH,
          }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            {icon ? icon : typeIconDefault}

            <View
              style={{
                maxWidth: CUSTOM_TOAST_WIDTH - 48 - CONTAINER_MARGIN * 2 - CONTAINER_MARGIN * 2,
                marginLeft: CONTAINER_MARGIN,
                marginRight: CONTAINER_MARGIN,
              }}>
              {text1 && <Text style={{ fontSize: Constants.fontSize.base, fontWeight: 'bold' }}>{text1}</Text>}
              {text2 && <Text style={{ fontSize: Constants.fontSize.base }}>{text2}</Text>}
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
    // </TouchableWithoutFeedback>
  );
};

export default {
  customSuccess: options => baseCustomConfig(options, 'customSuccess'),
  customError: options => baseCustomConfig(options, 'customError'),
  customInfo: options => baseCustomConfig(options, 'customInfo'),
  customWarn: options => baseCustomConfig(options, 'customWarn'),
};
