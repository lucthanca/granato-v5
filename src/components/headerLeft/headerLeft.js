import React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
// import {HeaderBackButton} from '@react-navigation/elements';
import {PlatformPressable} from '@react-navigation/elements';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {DrawerToggleButton} from '@react-navigation/drawer';

const HeaderLeft = props => {
  const {canGoBack, tintColor} = props;
  const navigation = useNavigation();
  return (
    <>
      {
        // canGoBack && (
        //   <HeaderBackButton
        //     pressOpacity={0.75}
        //     tintColor={tintColor}
        //     onPress={() => navigation.goBack()}
        //   />
        // ) // <TouchableOpacity><Text>Back</Text></TouchableOpacity> //<HeaderBackButton tintColor={tintColor} />
      }
      {!canGoBack && (
        <PlatformPressable
          accessible
          accessibilityRole="button"
          android_ripple={{borderless: true}}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={styles.touchable}
          hitSlop={Platform.select({
            ios: undefined,
            default: {top: 16, right: 16, bottom: 16, left: 16},
          })}>
          <Image
            style={[styles.icon, tintColor ? {tintColor} : null]}
            source={require('@react-navigation/drawer/src/views/assets/toggle-drawer-icon.png')}
            fadeDuration={0}
          />
        </PlatformPressable>
      )}
    </>
  );
};

export default HeaderLeft;
const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    margin: 3,
    resizeMode: 'contain',
  },
  touchable: {
    marginRight: 24,
  },
});
