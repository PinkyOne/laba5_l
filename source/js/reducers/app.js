import { Map } from 'immutable';

import {
  TEST_ACTION,
  ASYNC_ACTION_START,
  ASYNC_ACTION_ERROR,
  LOGIN_ACTION_SUCCESS,
  CASH_TRANSFER_ACTION_SUCCESS,
  WITHDRAWAL_ACTION_SUCCESS,
  GET_BALANCE_ACTION_SUCCESS,
  SAVE_ACCOUNT_NUMBER,
} from 'actions/app';

const initialState = Map({
  counter: 0,
  asyncLoading: false,
  asyncError: null,
  asyncData: null,
});

const actionsMap = {
  [TEST_ACTION]: (state) => {
    const counter = state.get('counter') + 1;

    return state.merge(Map({
      counter,
    }));
  },

  [SAVE_ACCOUNT_NUMBER]: (state, action) => {
    const { accountNumber } = action.data;

    return state.merge(Map({
      accountNumber,
    }));
  },

  // Async action
  [ASYNC_ACTION_START]: (state) => {
    return state.merge(Map({
      asyncLoading: true,
      asyncError: null,
      asyncData: null,
    }));
  },

  [ASYNC_ACTION_ERROR]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: action.error.message,
    }));
  },

  [LOGIN_ACTION_SUCCESS]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      login_response: action.data,
    }));
  },

  [CASH_TRANSFER_ACTION_SUCCESS]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      cashTransfer: action.data,
    }));
  },

  [WITHDRAWAL_ACTION_SUCCESS]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      withdrawal: action.data,
    }));
  },

  [GET_BALANCE_ACTION_SUCCESS]: (state, action) => {
    if (!action.data.error) {
      return state.merge(Map({
        asyncLoading: false,
        ...action.data,
      }));
    }
    return state.merge(Map({
      asyncLoading: false,
      balanceError: action.data.error,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
