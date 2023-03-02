import React from 'react';
import { Provider } from 'react-redux';
import Adapter from './components/Adapter';
import { configureStore } from '@reduxjs/toolkit';
import reducers from '../src/store/reducers';
import thunk from '../src/store/middleware/thunk';
export const customContext = React.createContext();
const configureLinks = links => [...links.values()];
const AppComposite = props => {
  const origin = props.apiBase;
  const customStore = configureStore({
    reducer: props.customReducer,
  });
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
        <Provider store={customStore} context={customContext}>
          {props.children}
        </Provider>
      </Provider>
    </Adapter>
  );
};

export default AppComposite;
