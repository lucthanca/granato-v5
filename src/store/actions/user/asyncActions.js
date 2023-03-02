import { removeCart } from '../cart';
import { clearCheckoutDataFromStorage } from '../checkout';
import storage from '../../../utils/simpleStorage';
import actions from './actions';

export const signOut = (payload = {}) =>
  async function thunk(dispatch) {
    const { revokeToken } = payload;

    if (revokeToken) {
      // Send mutation to revoke token.
      try {
        await revokeToken();
      } catch (error) {
        console.error('Error Revoking Token', error);
      }
    }

    // Remove token from local storage and Redux.
    await dispatch(clearToken());
    await dispatch(actions.reset());
    await clearCheckoutDataFromStorage();

    // Now that we're signed out, forget the old (customer) cart.
    // We don't need to create a new cart here because we're going to refresh
    // the page immediately after.
    await dispatch(removeCart());
  };

export const getUserDetails = (payload = {}) =>
  async function thunk(...args) {
    const [dispatch, getState] = args;
    const { user } = getState();

    if (user.isSignedIn) {
      dispatch(actions.getDetails.request());

      try {
        const { data } = await payload.fetchUserDetails();

        dispatch(actions.getDetails.receive(data.customer));
      } catch (error) {
        dispatch(actions.getDetails.receive(error));
      }
    }

    // if (user.isSignedIn) {
    // dispatch(actions.getDetails.request());

    // try {
    //     // const { data } = await fetchUserDetails();

    //     dispatch(actions.getDetails.receive(payload));
    // } catch (error) {
    //     dispatch(actions.getDetails.receive(error));
    // }
    // }
  };

export const resetPassword = ({ email }) =>
  async function thunk(...args) {
    const [dispatch] = args;

    dispatch(actions.resetPassword.request());

    // TODO: actually make the call to the API.
    // For now, just return a resolved promise.
    await Promise.resolve(email);

    dispatch(actions.resetPassword.receive());
  };

export const setToken = token =>
  async function thunk(...args) {
    const [dispatch] = args;

    // Store token in local storage.
    // TODO: Get correct token expire time from API
    await storage.setData('signin_token', token, 3600);

    // Persist in store
    dispatch(actions.setToken(token));
  };

export const clearToken = () =>
  async function thunk(...args) {
    const [dispatch] = args;

    // Clear token from local storage
    storage.removeItem('signin_token');

    // Remove from store
    dispatch(actions.clearToken());
  };

export async function retrieveCartId() {
  return storage.getData('cartId');
}

export async function saveCartId(id) {
  return storage.setData('cartId', id);
}
