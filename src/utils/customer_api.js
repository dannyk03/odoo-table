'use strict';

import * as fetch from './fetch';
import { login } from './login_api.js';

export async function send_order_url_to_customer (token) {
  const URL = fetch.SEND_ORDER_URL_TO_CUSTOMER_URL + "?token=" + token;

  if(!token)  {
    throw Error('No token provided!');
  }// if

  const response = await fetch.api(URL, {
    method: 'GET',
    credentials: 'include'
  });// fetch

  return response;
}// customer_detail_api

export async function get_customer_id (auth0_profile) {
  let username = null;

  try {
    if(auth0_profile && auth0_profile.name) {
      // strip '+' from phone number returned by Auth0
      username = auth0_profile.name.replace('+','');
    } else {
      return null;
    }// if-else

    const user_object = await login(username, username);

    if(user_object && user_object.results && user_object.results.user_id) {
      const id = user_object.results.user_id;
      return id;
    } else {
      return null;
    }// if-else
  } catch (e) {
    console.log(e);
    return null;
  }// if-else
}// customer_detail_api
