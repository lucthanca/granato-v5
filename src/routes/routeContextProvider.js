import React, {createContext, useState, useMemo, useContext} from 'react';

const RouteContext = createContext(undefined);

const RouteContextProvider = props => {
  const [activeStack, setActiveStack] = useState('Home');
  const contextValue = useMemo(
    () => () => {
      return [{activeStack}, {setActiveStack}];
    },
    [activeStack, setActiveStack],
  );

  return (
    <RouteContext.Provider value={contextValue()}>
      {props.children}
    </RouteContext.Provider>
  );
};

export default RouteContextProvider;
export const useRouteContext = () => useContext(RouteContext);
