import React from 'react';
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';

function Header() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log('route: ', route);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Home');
      }}
      style={styles.root}
      activeOpacity={0.5}>
      <Image source={require('../../../assets/images/logo/logo.png')} style={styles.logo} resizeMode={'contain'} />
    </TouchableOpacity>
  );
}

export default Header;
