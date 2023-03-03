import React, { memo } from 'react';
import Constants from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import t from '../../utils/identify';

const PageNotFound = memo(() => {
  const navigation = useNavigation();
  const styles = {
    root: {
      width: '100%',
      height: '75%',
      borderColor: 'green',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: { width: '75%' },
    goHomeBtn: {
      // borderColor: 'red',
      // borderWidth: 3,
      paddingHorizontal: Constants.alignSize[5],
      borderRadius: Constants.borderRadius.xs,
      backgroundColor: Constants.color.primary,
      flexDirection: 'row',
      alignItems: 'center',
      height: Constants.button.height.primary,
    },
    goHomeBtnIconBack: {
      width: Constants.fontSize.md,
      fontSize: Constants.fontSize.md,
      borderColor: 'red',
      color: Constants.color.white.normal,
    },
    goHomeBtnText: {
      marginLeft: Constants.alignSize[2],
      color: Constants.color.white.normal,
    },
  };

  return (
    <View style={styles.root}>
      <Text style={{ fontSize: Constants.fontSize['3xl'] }}>{t.__('Whoops, our bad...')}</Text>
      <LottieView
        source={require('../../assets/lottie-animated-icons/84918-404-error-doodle-animation.json')}
        style={styles.icon}
        loop={true}
        autoPlay={true}
        resizeMode={'contain'}
      />
      <TouchableOpacity style={styles.goHomeBtn} activeOpacity={0.75} onPress={() => navigation.navigate('Home')}>
        <Icon name={'arrowleft'} style={styles.goHomeBtnIconBack} />
        <Text style={styles.goHomeBtnText}>{t.__('Go to Home')}</Text>
      </TouchableOpacity>
    </View>
  );
});

export default PageNotFound;
