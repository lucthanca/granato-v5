/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Stack from './stack';
import { useRouteContext } from './routeContextProvider';

const Drawer = createDrawerNavigator();

const DrawerContent = props => {
  const { navigation } = props;
  const [{ activeStack }] = useRouteContext();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label='Home' onPress={() => navigation.navigate('Home')} focused={activeStack === 'Home'} />
      <DrawerItem
        label="Notifications"
        onPress={() => navigation.navigate('Notifications')}
        focused={activeStack === 'Notifications'}
      />
      <DrawerItem
        label="Product View"
        onPress={() => navigation.navigate('ProductFullDetail')}
        focused={activeStack === 'ProductFullDetail'}
      />
      <DrawerItem label="Category" onPress={() => navigation.navigate('Category')} focused={activeStack === 'Category'} />
      <DrawerItem
        label="ProductList"
        onPress={() => navigation.navigate('ProductList')}
        focused={activeStack === 'ProductList'}
      />
    </DrawerContentScrollView>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Stack" component={Stack} options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return <MyDrawer />;
}
