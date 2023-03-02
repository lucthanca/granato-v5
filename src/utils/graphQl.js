const graphQLQueries = {
  getStoreConfigData: {
    query: `query GetStoreConfigData {
      storeConfig {
        store_code
        code
        locale
        secure_base_media_url
        store_name
        newsletter_enabled
      }
    }`,
  },
  getAvailableStoresConfigData: {
    query: `
      query getAvailableStoresConfigData {
        availableStores {
          store_code
          id
          secure_base_media_url
          store_name
          default_display_currency_code
        }
      }`,
  },
};

import config from '../config';

export const useGraphQl = props => {
  const { merchant_url } = config;
  const fetchQuery = query => {
    if (!merchant_url) {
      return Promise.reject(new Error('Merchant Url missing!'));
    }
    // const targetURL = new URL('graphql', merchant_url);
    // console.log(targetURL);
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };

    // if (process.env.STORE_VIEW_CODE) {
    //   headers['store'] = process.env.STORE_VIEW_CODE;
    // }

    return fetch(merchant_url, {
      credentials: 'include',
      body: JSON.stringify(query),
      headers: headers,
      method: 'POST',
    })
      .then(result => {
        // console.log('Result received');
        // console.log('Status: %s', result.status);
        // result.text().then(rt => console.log(rt));
        return result.json();
      })
      .catch(err => {
        console.error(err);
        throw err;
      })
      .then(json => {
        if (json && json.errors && json.errors.length > 0) {
          console.warn(
            '\x1b[36m%s\x1b[0m',
            'As of version 12.1.0, PWA Studio requires the appropriate PWA metapackage to be installed on the backend.\n' +
              'For more information, refer to the 12.1.0 release notes here: https://github.com/magento/pwa-studio/releases/tag/v12.1.0',
          );

          return Promise.reject(new Error(json.errors[0].message + ` (... ${json.errors.length} errors total)`));
        }

        return json.data;
      });
  };

  /**
   * An Async function that will asynchronously fetch the
   * store config data from magento graphql server.
   *
   * @returns Promise that will resolve to the store config data.
   */
  const getStoreConfigData = () => {
    return fetchQuery(graphQLQueries.getStoreConfigData).then(data => data.storeConfig);
  };

  /**
   * An async function that will fetch the availableStores
   *
   * @returns Promise
   */
  const getAvailableStoresConfigData = () => {
    return fetchQuery(graphQLQueries.getAvailableStoresConfigData);
  };

  return {
    getStoreConfigData,
    getAvailableStoresConfigData,
  };
};
