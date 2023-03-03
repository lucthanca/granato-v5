import React from 'react';
import { Provider } from 'react-redux';
import Adapter from './components/adapter';
import { configureStore } from '@reduxjs/toolkit';
import reducers from '../src/store/reducers';
import thunk from '../src/store/middleware/thunk';

import AppContextProvider from './context/app';
import CatalogContextProvider from './context/catalog';
import CartContextProvider from './context/cart';
// import CheckoutContextProvider from './context/checkout';
import UserContextProvider from './context/user';
export const customContext = React.createContext();
const configureLinks = links => [...links.values()];
const AppComposite = props => {
  const origin = props.apiBase;
  // const customStore = configureStore({
  //   reducer: props.customReducer,
  // });
  const joinStore = configureStore({
    reducer: {
      ...reducers,
      ...props.customReducer,
    },
    middleware: [thunk],
  });
  return (
    <Adapter origin={origin} configureLinks={configureLinks}>
      <Provider store={joinStore}>
        <AppContextProvider>
          <UserContextProvider>
            <CatalogContextProvider>
              <CartContextProvider>{props.children}</CartContextProvider>
            </CatalogContextProvider>
          </UserContextProvider>
        </AppContextProvider>
      </Provider>
    </Adapter>
  );
};

export default AppComposite;
