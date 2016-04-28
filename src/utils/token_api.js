'use strict';

import * as fetch from './fetch';

export async function get_signed_token (payload) {
  const URL = fetch.GET_SIGNED_TOKEN_ENDPOINT;

  try {
    const response = await fetch.api(URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          claims: payload
        })
    });// fetch

    return response.token || null;

  } catch (e) {
    console.log(e);
    return null;
  }// try-catch
}// get_signed_token
