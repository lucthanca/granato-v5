import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRouteContext } from './routeContextProvider';
import HeaderLeft from '../components/headerLeft';
import HomeScreen from '../screens/home';
import { ProductFullDetail, Category } from '../screens';

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button title="Go to Notifications" onPress={() => navigation.navigate('Notifications')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Notification Screen</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function Help({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Help modal Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function Invite({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Invite modal Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function MyStack() {
  const [, { setActiveStack }] = useRouteContext();
  const screenListener = ({ route }) => {
    return {
      state: e => {
        setActiveStack(route.name);
      },
    };
  };
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }} screenListeners={screenListener}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: props => <HeaderLeft {...props} /> }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerLeft: props => (!props.canGoBack ? <HeaderLeft {...props} /> : null) }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ProductFullDetail" component={ProductFullDetail} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Invite" component={Invite} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default function App() {
  return <MyStack />;
}
