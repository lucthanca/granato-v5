import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useAdapter } from '../../talons/adapter/useAdapter';

const Adapter = props => {
  const talonProps = useAdapter(props);
  const { apolloProps, initialized } = talonProps;
  if (!initialized) {
    return null;
  }
  return <ApolloProvider {...apolloProps}>{props.children}</ApolloProvider>;
};

export default Adapter;
