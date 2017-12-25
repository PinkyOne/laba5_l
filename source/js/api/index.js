import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

promisePolyfill.polyfill();

export function login(credentials) {
  return fetch('http://localhost:9010/teller/gettoken/1', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json());
}

export function apiSendCashTransfer(data) {
  const { token, accountNumber, amount } = data;
  return fetch(`http://localhost:9010/teller/transfer/${ token }/${ accountNumber }/${ amount }`)
    .then(response => response.json());
}
export function apiSendWithdrawal(data) {
  const { token, accountNumber, amount, typeBill } = data;
  return fetch(`http://localhost:9010/teller/withdraw/${ token }/${ accountNumber }/${ amount }/${ typeBill }`)
    .then(response => response.json());
}
export function apiGetBalance(data) {
  const { token, accountNumber } = data;
  return fetch(`http://localhost:9010/teller/checkbalance/${ token }/${ accountNumber }`)
    .then(response => response.json());
}
