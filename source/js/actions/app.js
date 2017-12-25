import {
  login as apiLogin,
  apiSendCashTransfer,
  apiGetBalance,
  apiSendWithdrawal,
} from 'api';

export const TEST_ACTION = 'TEST_ACTION';
export const SAVE_ACCOUNT_NUMBER = 'SAVE_ACCOUNT_NUMBER';

export const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
export const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR';
export const LOGIN_ACTION_SUCCESS = 'LOGIN_ACTION_SUCCESS';
export const CASH_TRANSFER_ACTION_SUCCESS = 'CASH_TRANSFER_ACTION_SUCCESS';
export const WITHDRAWAL_ACTION_SUCCESS = 'WITHDRAWAL_ACTION_SUCCESS';
export const GET_BALANCE_ACTION_SUCCESS = 'GET_BALANCE_ACTION_SUCCESS';

// Test action

export function testAction() {
  return {
    type: TEST_ACTION,
  };
}

// Async action example

function asyncStart() {
  return {
    type: ASYNC_ACTION_START,
  };
}

function loginSuccess(data) {
  return {
    type: LOGIN_ACTION_SUCCESS,
    data,
  };
}

function saveAccountNumber(data) {
  return {
    type: SAVE_ACCOUNT_NUMBER,
    data,
  };
}

function getBalanceSuccess(data) {
  return {
    type: GET_BALANCE_ACTION_SUCCESS,
    data,
  };
}

function sendWithdrawalSuccess(data) {
  return {
    type: WITHDRAWAL_ACTION_SUCCESS,
    data,
  };
}
function sendCashTransferSuccess(data) {
  return {
    type: CASH_TRANSFER_ACTION_SUCCESS,
    data,
  };
}

function asyncError(error) {
  return {
    type: ASYNC_ACTION_ERROR,
    error,
  };
}

export function login(data) {
  return function (dispatch) {
    dispatch(asyncStart());

    apiLogin(data)
      .then(resp => {
        dispatch(saveAccountNumber(data));
        dispatch(loginSuccess(resp));
      })
      .catch(error => dispatch(asyncError(error)));
  };
}

export function getBalance(data) {
  return function (dispatch) {
    dispatch(asyncStart());

    apiGetBalance(data)
      .then(resp => dispatch(getBalanceSuccess(resp)))
      .catch(error => dispatch(asyncError(error)));
  };
}

export function sendCashTransfer(data) {
  return function (dispatch) {
    dispatch(asyncStart());

    apiSendCashTransfer(data)
      .then(resp => dispatch(sendCashTransferSuccess(resp))
        .then(dispatch(getBalance(data)))
      ).catch(error => dispatch(asyncError(error)));
  };
}


export function sendWithdrawal(data) {
  return function (dispatch) {
    dispatch(asyncStart());

    apiSendWithdrawal(data)
      .then(resp => dispatch(sendWithdrawalSuccess(resp))
        .then(dispatch(getBalance(data))))
      .catch(error => dispatch(asyncError(error)));
  };
}
