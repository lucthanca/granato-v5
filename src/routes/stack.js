import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRouteContext } from './routeContextProvider';
import HeaderLeft from '../components/headerLeft';
import HomeScreen from '../screens/home';
import { ProductFullDetail, Category, ProductList, ProductGallery, MyAccount, CustomerPage, AddressBookPage } from '../screens';
import Header from '../base/components/Header/header';
import { Text } from 'react-native';
const Stack = createNativeStackNavigator();
import HeaderRight from '../components/HeaderRight';
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
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: props => <HeaderLeft {...props} />,
          headerTitle: props => <Header {...props} />,
          headerRight: props => <HeaderRight {...props} />,
        }}
      />
      <Stack.Screen
        name="ProductFullDetail"
        component={ProductFullDetail}
        options={{ headerLeft: props => <HeaderLeft {...props} />, headerTitle: props => <Header {...props} /> }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{ headerLeft: props => <HeaderLeft {...props} />, headerTitle: props => <Header {...props} /> }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{ headerLeft: props => <HeaderLeft {...props} />, headerTitle: props => <Header {...props} /> }}
      />
      <Stack.Screen
        name="ProductGallery"
        component={ProductGallery}
        options={{ headerLeft: props => <HeaderLeft {...props} />, headerTitle: props => <Header {...props} /> }}
      />
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{ headerLeft: props => <HeaderLeft {...props} />, headerTitle: props => <Header {...props} /> }}
      />
      <Stack.Screen
        name="CustomerPage"
        component={CustomerPage}
        options={{ headerLeft: props => <HeaderLeft {...props} />, headerTitle: props => <Header {...props} /> }}
      />
      <Stack.Screen
        name="AddressBookPage"
        component={AddressBookPage}
        options={{ headerLeft: props => <HeaderLeft {...props} />, headerTitle: props => <Header {...props} /> }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return <MyStack />;
}
