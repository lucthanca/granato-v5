/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from './src/config';
import AppComposite from './src/appComposite';
import Routes from './src/routes';
import Toast from 'react-native-toast-message';
import toastConfig from './src/components/toast/customToast';
const MainApp = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppComposite apiBase={config.merchant_url}>
        <Routes />
        <Toast config={toastConfig} />
      </AppComposite>
    </SafeAreaView>
  );
};

export default MainApp;
