import { createActions } from 'redux-actions';

const prefix = 'CATALOG';
const actionMap = {
  SET_CURRENT_PAGE: {
    REQUEST: null,
    RECEIVE: null,
  },
  SET_PREV_PAGE_TOTAL: {
    REQUEST: null,
    RECEIVE: null,
  },
};

const actionTypes = ['UPDATE_CATEGORIES'];

export default createActions(actionMap, ...actionTypes, { prefix });
