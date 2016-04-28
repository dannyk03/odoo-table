const Realm = require('realm');

const productSchema = {
  name: 'Product',
  primaryKey: 'default_code',
  properties: {
    id: 'int',
    name: 'string',
    default_code: 'string',
    list_price: 'float'
  }
};// productsSchema

let realm = new Realm({
  schema: [productSchema]
});// realm

import {
  login
} from './login_api';

import {
  list_products
} from './product_api';

const query_params = {
  fields: "name,default_code,list_price",
  limit: 99999999999,
  // offset: 0,
  order: "write_date desc"
};// query_params

async function saveProductsToRealm(products)  {
  products = products || [];
  var db = await realm.write(() => {
    products.map((p) => {
      // HACK FIXME TODO: temp workaround for products lacking a barcode
      p.default_code = Math.random().toString(36).slice(2);
      return realm.create('Product', p);
    });// products.map
  });// realm.write
}// saveProductsToRealm

function getObjectsInSchema(options)  {
  let { schema, filter, max } = options;

  max = max || 10; // a default of 10 max objects returned

  try {
    let objects = realm.objects(schema);

    if(filter)  {
      objects = objects.filtered(filter);
    }// if

    return objects.slice(0, max);

  } catch (e) {
    return [];
  }// try-catch
}// getObjectsInSchema

function numObjectsInSchema(schema)  {
  try {
    const numObjects = realm.objects(schema).length;
    console.log('# objects FOUND in realm db: ', numObjects);
    return numObjects;
  } catch (e) {
    return 0;
  }// try-catch
}// numObjectsInSchema

export async function fetchProducts(options) {
  let { filter, max } = options;

  const numObjects = numObjectsInSchema('Product');
  if(numObjects > 1) {
    console.log('Fetching products from LOCAL datastore.');
    return getObjectsInSchema({
      schema: 'Product',
      filter: filter,
      max: max
    });// getObjectsInSchema
  }//if

  let products = [];
  let user = {};

  try {
    user = await login();
    console.log(user);
  } catch (e) {
    console.error(e);
    return [];
  }// try-catch

  try {
    console.log('Fetching products from REMOTE datastore.');
    products = await list_products(query_params);
    if(products.results)  {
      await saveProductsToRealm(products.results);
      return getObjectsInSchema({
        schema: 'Product',
        filter: filter,
        max: max
      });// getObjectsInSchema
    } else {
      console.warn('Missing results key in products results');
      return [];
    }// if-else
  } catch (e) {
    console.error(e);
    return [];
  }// try-catch
}// fetchProducts
