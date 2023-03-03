import { setContext } from '@apollo/client/link/context';
import storage from '../../utils/simpleStorage';

// Do not use hook here

export default function createStoreLink({ storeCode: STORE_VIEW_CODE }) {
  return setContext(async (_, { headers }) => {
    const storeCurrency = (await storage.getData('store_view_currency')) || null;
    const storeCode = (await storage.getData('store_view_code')) || STORE_VIEW_CODE;

    // console.log({storeCode});
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        store: storeCode,
        ...(storeCurrency && {
          'Content-Currency': storeCurrency,
        }),
      },
    };
  });
}
