export default {
  product_list: {
    initialRoute: true,

    title: 'Snack Impact',
    component: require('./scenes/ProductListView').default,

    children: {
      barcode_scanner_view: {
        title: 'Barcode Scanner',
        component: require('./scenes/BarcodeScannerView').default,
      },
      login_view: {
        title: 'Sign In',
        component: require('./scenes/Auth0LoginView').default,
      }
    }
  }
};// default
