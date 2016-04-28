import Config from 'react-native-config';

export const VENDOR_EMAIL = Config.VENDOR_EMAIL || null;
export const VENDOR_PASSWORD = Config.VENDOR_PASSWORD || null;
export const VENDOR_KIOSK_ID = Config.VENDOR_KIOSK_ID || null;

export const LOGIN_ENDPOINT = Config.API_ENDPOINT + '/login';
export const LOGOUT_ENDPOINT = Config.API_ENDPOINT + '/logout';

export const PRODUCT_LIST_ENDPOINT = Config.API_ENDPOINT + "/products";
export const PRODUCT_DETAIL_ENDPOINT = Config.API_ENDPOINT + "/products/";

export const CUSTOMER_LIST_ENDPOINT = Config.API_ENDPOINT + "/customers";
export const CUSTOMER_DETAIL_ENDPOINT = Config.API_ENDPOINT + "/customers/";

export const ADD_TRANSACTION_ENDPOINT = Config.API_ENDPOINT + "/add_transaction";

export const SEND_ORDER_URL_TO_CUSTOMER_URL = Config.API_ENDPOINT + "/send_order_url_to_customer";

export const GET_SIGNED_TOKEN_ENDPOINT = Config.API_ENDPOINT + "/get_signed_token";
