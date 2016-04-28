'use strict';

import * as fetch from './fetch';

export async function list_products (query_params) {
  const URL = fetch.PRODUCT_LIST_ENDPOINT + "?" + fetch.querystring.stringify(query_params);

  const response = await fetch.api(URL, {
    method: 'GET',
    credentials: 'include'
  });// fetch

  return response;
}// list_products

export async function product_detail_api (barcode, query_params) {
  // const URL = fetch.PRODUCT_DETAIL_ENDPOINT + barcode + '?fields=id,name,default_code,list_price,qty_available,type,sales_count,categ_id,qty_available';
  const URL = fetch.PRODUCT_DETAIL_ENDPOINT + barcode + "?" + fetch.querystring.stringify(query_params);

  const response = fetch.api(URL, {
    method: 'GET',
    credentials: 'include'
  });// fetch

  return response;
}// product_detail_api
