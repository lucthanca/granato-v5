/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Stack from './stack';
import {useRouteContext} from './routeContextProvider';

function Feed(props) {
  const {navigation} = props;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Feed Screen</Text>
      <Button
        title={'Go to Profiles'}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

function Article() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

const DrawerContent = props => {
  const {navigation} = props;
  const [{activeStack}] = useRouteContext();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate('Home')}
        focused={activeStack === 'Home'}
      />
      <DrawerItem
        label="Notifications"
        onPress={() => navigation.navigate('Notifications')}
        focused={activeStack === 'Notifications'}
      />
    </DrawerContentScrollView>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Stack"
        component={Stack}
        options={{drawerItemStyle: {display: 'none'}}}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return <MyDrawer />;
}
