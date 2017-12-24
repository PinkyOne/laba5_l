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

function testAsync() {
  return fetch('http://localhost:9010/teller/gettoken/1', {
    method: 'POST',
    body: JSON.stringify({
      accountName: 'Ivanov',
      accountNumber: 10000,
      pin: 1111,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json());
}

export default {
  testAsync,
};
