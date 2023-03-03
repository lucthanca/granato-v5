import AppStorage from '../../../utils/simpleStorage';
import actions from './actions';

export const removeGlobalLoading = () => async dispatch => dispatch(actions.removeGlobalLoading());

export const setGlobalLoading = () => async dispatch => dispatch(actions.setGlobalLoading());

export const toggleDrawer = name => async dispatch => dispatch(actions.toggleDrawer(name));

export const closeDrawer = () => async dispatch => dispatch(actions.toggleDrawer(null));

/** @deprecated */
export const toggleSearch = () => async dispatch => dispatch(actions.toggleSearch());

export const setToken = token => async dispatch => dispatch(actions.setToken(token));
export const setLogin = status => async dispatch => dispatch(actions.setLogin(status));

export const setRecentSearches = payload =>
  async function thunk(dispatch) {
    await AppStorage.setData('recent_search', payload.toString());
    // return Promise.all([
    dispatch(actions.setRecentSearches(payload));
    // ]);
  };

export const getRecentSearches = () =>
  async function thunk(dispatch) {
    const recentSearches = await AppStorage.getData('recent_search');
    const data = recentSearches.split(',');
    // return Promise.all([
    dispatch(actions.setRecentSearches(data));
    // ]);
  };
