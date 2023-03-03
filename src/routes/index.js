import React from 'react';

import RouteContextProvider from './routeContextProvider';
import CombinedRoutes from './combinedRoutes';

export default props => {
  return (
    <RouteContextProvider>
      <CombinedRoutes {...props} />
    </RouteContextProvider>
  );
};
