import storage from '../../../utils/simpleStorage';
import { signOut } from '../user';
import actions from './actions';

/* helpers */
export async function retrieveCartId() {
  return storage.getData('cartId');
}
export async function saveCartId(id) {
  return storage.setData('cartId', id);
}

export async function clearCartId() {
  return storage.removeItem('cartId');
}

export const createCart = payload =>
  async function thunk(dispatch, getState) {
    const { fetchCartId } = payload;
    const { cart } = getState();

    // if a cart already exists in the store, exit
    if (cart.cartId) {
      return;
    }

    // Request a new cart.
    dispatch(actions.getCart.request());

    // if a cart exists in storage, act like we just received it
    const cartId = await retrieveCartId();
    if (cartId) {
      dispatch(actions.getCart.receive(cartId));
      return;
    }

    try {
      // errors can come from graphql and are not thrown
      const { data, errors } = await fetchCartId({
        fetchPolicy: 'no-cache',
      });
      console.log('createCart data: ', data);

      let receivePayload;

      if (errors) {
        receivePayload = new Error(errors);
      } else {
        receivePayload = data.cartId;
        // write to storage in the background
        saveCartId(data.cartId);
      }

      dispatch(actions.getCart.receive(receivePayload));
    } catch (error) {
      // If we are unable to create a cart, the cart can't function, so
      // we forcibly throw so the upstream actions won't retry.
      dispatch(actions.getCart.receive(error));
      throw new Error('Unable to create cart');
    }
  };

// Returns true if the cart is invalid.
function isInvalidCart(error) {
  return !!(
    error.graphQLErrors &&
    error.graphQLErrors.find(
      err =>
        err.message.includes('Could not find a cart') ||
        err.message.includes("The cart isn't active") ||
        err.message.includes('The current user cannot perform operations on cart'),
    )
  );
}

export const getCartDetails = payload => {
  const { fetchCartId, fetchCartDetails } = payload;

  return async function thunk(dispatch, getState, { apolloClient }) {
    const { cart, user } = getState();
    const { cartId } = cart;
    console.log('cart: ', cart);
    const { isSignedIn } = user;

    // if there isn't a cart, create one then retry this operation
    if (!cartId) {
      try {
        await dispatch(
          createCart({
            fetchCartId,
          }),
        );
      } catch (error) {
        // If creating a cart fails, all is not lost. Return so that the
        // user can continue to at least browse the site.
        return;
      }
      return thunk(...arguments);
    }

    // Once we have the cart id indicate that we are starting to make
    // async requests for the details.
    dispatch(actions.getDetails.request(cartId));

    try {
      const { data } = await fetchCartDetails({
        variables: { cartId },
        fetchPolicy: 'network-only',
      });
      const { cart: details } = data;

      dispatch(actions.getDetails.receive({ details }));
    } catch (error) {
      dispatch(actions.getDetails.receive(error));

      const shouldResetCart = !error.networkError && isInvalidCart(error);
      if (shouldResetCart) {
        if (isSignedIn) {
          // Since simple persistence just deletes auth token without
          // informing Redux, we need to perform the sign out action
          // to reset the user and cart slices back to initial state.
          await dispatch(signOut());
        } else {
          // Delete the cached ID from local storage.
          await dispatch(removeCart());
        }

        // Clear cart data from Apollo cache
        await apolloClient.clearCacheData(apolloClient, 'cart');

        // Create a new cart
        try {
          await dispatch(
            createCart({
              fetchCartId,
            }),
          );
        } catch (error) {
          // If creating a cart fails, all is not lost. Return so that the
          // user can continue to at least browse the site.
          return;
        }

        // Retry this operation
        return thunk(...arguments);
      }
    }
  };
};

export const removeCart = () =>
  async function thunk(dispatch) {
    // Clear the cartId from local storage.
    await clearCartId();

    // Clear the cart info from the redux store.
    dispatch(actions.reset());
  };

// export const setCartDetails = () =>
//   async function thunk(dispatch) {
//     // return Promise.all([
//     dispatch(actions.setCartDetails(data));
//     // ]);
//   };
