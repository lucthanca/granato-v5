import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Drawer from './drawer';

export default props => {
  return (
    <NavigationContainer>
      <Drawer />
    </NavigationContainer>
  );
};
