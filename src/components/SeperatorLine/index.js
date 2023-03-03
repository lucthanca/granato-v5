import React, { memo } from 'react';
import { View } from 'react-native';

const SeperatorLine = ({ color, width }) => {
  const style = {
    height: 1,
    width,
    backgroundColor: color,
  };
  return <View style={style} />;
};

export default memo(SeperatorLine);