import React, { memo } from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingIndicator = (props) => {
  return (
    <View style={{ borderWidth: 0, borderColor: 'red', flex: 1 }}>
      <ActivityIndicator />
    </View>
  );
};

export default memo(LoadingIndicator);
