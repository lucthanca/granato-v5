import { useMemo, useState, useEffect } from 'react';
import { useGraphQl } from './graphQl';
import config from '../config';

export const useGlobal = props => {
  const { getStoreConfigData, getAvailableStoresConfigData } = useGraphQl();
  const [_storeConfigData, setStoreConfigData] = useState(undefined);
  const [_availableStores, setAvailableStores] = useState([]);

  const availableStore = {
    store_name: 'Default Store View',
    code: 'default',
  };

  useEffect(() => {
    getStoreConfigData().then(data => {
      // console.log(data);
      return setStoreConfigData(() => data);
    });
    getAvailableStoresConfigData().then(data => {
      // console.log({ availableStoreConfigData: data });
      return setAvailableStores(() => data);
    });
  }, []);

  const storeConfigData = useMemo(() => {
    if (_storeConfigData) {
      return _storeConfigData;
    }
    return {
      store_name: 'Default Store View',
      locale: 'en_US',
      code: 'default',
    };
  }, [_storeConfigData]);

  const availableStores = useMemo(() => {
    if (_availableStores) {
      return _availableStores;
    }
    return [];
  }, [_availableStores]);

  return {
    STORE_NAME: availableStore?.store_name || storeConfigData.store_name,
    STORE_VIEW_CODE: config?.store_view_code || storeConfigData.code,
    DEFAULT_LOCALE: storeConfigData?.locale?.replace('_', '-') || 'en-US',
    AVAILABLE_STORE_VIEWS: availableStores,
    DEFAULT_COUNTRY_CODE: config.default_country_code || 'US',
  };
};
