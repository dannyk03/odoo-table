'use strict';

export const querystring = require('query-string');
export * from './api_endpoints';

function isError (response) {
  if (response.status >= 200 && response.status < 300) {
    return false;
  } else {
    var error = new Error(response.statusText);
    error.status = response.status;
    throw error;
  }// if-else
}// isError

function isAuthenticated(response) {
  if (response.status === 401)  {
    // console.log('401 Unauthenticated!');
    // FIXME: TODO: Authenticate here.
    // return response;
    return false;
  } else {
    return true;
  }// if
}// isAuthenticated

export async function api (endpoint, options) {
  // don't alter credentials option if already set
  // else set to 'include'
  // https://github.com/github/fetch#sending-cookies
  if (!options.credentials) {
    options.credentials = 'include';
  }// if

  try {
    const response = await fetch(endpoint, options);
    isAuthenticated(response);
    isError(response);
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }// try-catch
}// api

// module.exports = api;
