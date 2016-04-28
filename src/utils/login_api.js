'use strict';

import * as fetch from './fetch';

export async function login (username, password) {
  var data = {
    email: username || fetch.VENDOR_EMAIL,
    password: password || fetch.VENDOR_PASSWORD
  };// data

  console.log(data);

  const response = await fetch.api(fetch.LOGIN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }); // fetch

  return response;
}// login

export async function logout () {
  const response = await fetch.api(fetch.LOGOUT_ENDPOINT, {
    method: 'GET'
  }); // fetch

  return response;
}// logout

export function isAuthenticated(response) {
  return response.status !== 401;
}// isAuthenticated
