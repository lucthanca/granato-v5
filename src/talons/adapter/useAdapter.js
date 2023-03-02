import { ApolloLink } from '@apollo/client';
import { ApolloClient } from '@apollo/client/core';
import { useMemo, useCallback, useEffect, useState } from 'react';
import { InMemoryCache } from '@apollo/client/cache';
import { CachePersistor, AsyncStorageWrapper } from 'apollo3-cache-persist';
// import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import possibleTypes from '../../../possibleTypes.json';
import typePolicies from '../../Apollo/policies';
import storage from '../../utils/simpleStorage';
import { useGlobal } from '../../utils/global';
import getLinks from '../../Apollo/links';
import { CACHE_PERSIST_PREFIX } from '../../Apollo/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import attachClient from '../../Apollo/attachClientToStore';
import { clearCartDataFromCache } from '../../Apollo/clearCartDataFromCache';
import { clearCustomerDataFromCache } from '../../Apollo/clearCustomerDataFromCache';

const isServer = false;

// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData
// });

/**
 * To improve initial load time, create an apollo cache object as soon as
 * this module is executed, since it doesn't depend on any component props.
 * The tradeoff is that we may be creating an instance we don't end up needing.
 */
const preInstantiatedCache = new InMemoryCache({
  // POSSIBLE_TYPES is injected into the bundle by webpack at build time.
  possibleTypes: possibleTypes || {},
  typePolicies,
});

export const useAdapter = props => {
  const { apiUrl, origin, configureLinks } = props;
  const { STORE_VIEW_CODE, AVAILABLE_STORE_VIEWS } = useGlobal();
  // console.log({ STORE_VIEW_CODE, AVAILABLE_STORE_VIEWS });
  const [initialized, setInitialized] = useState(false);

  const apiBase = useMemo(() => apiUrl || new URL('/graphql', origin).toString(), [apiUrl, origin]);

  const apolloLink = useMemo(() => {
    let links = getLinks(apiBase, { storeCode: STORE_VIEW_CODE });
    if (configureLinks) {
      links = configureLinks(links, apiBase);
    }

    return ApolloLink.from(Array.from(links.values()));
  }, [apiBase, configureLinks]);

  const createApolloClient = useCallback((cache, link) => {
    return new ApolloClient({
      cache,
      link,
      ssrMode: isServer,
    });
  }, []);

  const createCachePersistor = useCallback((storeCode, cache) => {
    return isServer
      ? null
      : new CachePersistor({
          key: `${CACHE_PERSIST_PREFIX}-${storeCode}`,
          cache,
          storage: new AsyncStorageWrapper(AsyncStorage),
          debug: true,
        });
  }, []);

  const clearCacheData = useCallback(
    async (client, cacheType) => {
      const storeCode = storage.getData('store_view_code') || STORE_VIEW_CODE;

      // Clear current store
      if (cacheType === 'cart') {
        await clearCartDataFromCache(client);
      } else if (cacheType === 'customer') {
        await clearCustomerDataFromCache(client);
      }

      // Clear other stores
      for (const store of AVAILABLE_STORE_VIEWS) {
        if (store.store_code !== storeCode) {
          // Get saved data directly from local storage
          const existingStorePersistor = storage.getData(`${CACHE_PERSIST_PREFIX}-${store.store_code}`);

          // Make sure we have data available
          if (existingStorePersistor && Object.keys(existingStorePersistor).length > 0) {
            const storeCache = new InMemoryCache();

            // Restore available data
            storeCache.restore(JSON.parse(existingStorePersistor));

            const storeClient = createApolloClient(storeCache, apolloLink);

            storeClient.persistor = isServer ? null : createCachePersistor(store.store_code, storeCache);

            // Clear other store
            if (cacheType === 'cart') {
              await clearCartDataFromCache(storeClient);
            } else if (cacheType === 'customer') {
              await clearCustomerDataFromCache(storeClient);
            }
          }
        }
      }
    },
    [apolloLink, createApolloClient, createCachePersistor],
  );

  const apolloClient = useMemo(() => {
    const storeCode = storage.getData('store_view_code') || STORE_VIEW_CODE;
    const client = createApolloClient(preInstantiatedCache, apolloLink);
    const persistor = createCachePersistor(storeCode, preInstantiatedCache);

    client.apiBase = apiBase;
    client.persistor = persistor;
    client.clearCacheData = clearCacheData;

    return client;
  }, [apiBase, apolloLink, clearCacheData, createApolloClient, createCachePersistor]);

  const apolloProps = { client: apolloClient };

  useEffect(() => {
    if (initialized) {
      return;
    }

    // immediately invoke this async function
    (async () => {
      // restore persisted data to the Apollo cache
      await apolloClient.persistor.restore();

      // attach the Apollo client to the Redux store
      await attachClient(apolloClient);

      // mark this routine as complete
      setInitialized(true);
    })();
  }, [apolloClient, initialized]);

  return {
    apolloProps,
    initialized,
  };
};
