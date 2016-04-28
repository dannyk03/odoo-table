'use strict';

import * as fetch from './fetch';

import {
  login
} from './login_api';

export async function add_transaction (sales_data, auth0_profile) {
  const URL = fetch.ADD_TRANSACTION_ENDPOINT;

  let { customer_id, kiosk_id, payment_method, orders } = sales_data;

  let username = null;

  try {
    if(auth0_profile && auth0_profile.name) {
      // strip '+' from phone number returned by Auth0
      username = auth0_profile.name.replace('+','');
    } else {
      return null;
    }// if-else

    const user_object = await login(username, username);
    console.log(user_object);

    var order_data = {
      "partner_id": customer_id,
      "warehouse_id": kiosk_id || fetch.VENDOR_KIOSK_ID,
      "payment_method": payment_method,
      "order_line": orders
    };// order_data

    const response = await fetch.api(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order_data)
    });// fetch

    return response;

  } catch (e) {
    console.error(e);
    return null;
  }// try-catch
}// add_transaction
