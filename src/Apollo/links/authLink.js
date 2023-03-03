import { setContext } from '@apollo/client/link/context';
import storage from '../../utils/simpleStorage';

export default function createAuthLink() {
  return setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists.
    const token = await storage.getData('signin_token');
    // console.log('token: ', token);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
}
