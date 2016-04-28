import React, { Component, PropTypes, View, Text, Image } from 'react-native';

import {
  Avatar,
  Drawer,
  Divider,
  COLOR,
  TYPO
} from 'react-native-material-design';

let logo = require('../../ic_icon.png');

export default class Navigation extends Component {

  static contextTypes = {
    drawer: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    theme: React.PropTypes.string.isRequired
  };

  static propTypes = {
    logo: React.PropTypes.any.isRequired,
    headerTitle: React.PropTypes.string.isRequired
  };// propTypes

  static defaultProps = {
    logo: logo,
    headerTitle: 'React Native Prototype'
  };// defaultProps

  constructor(props) {
    super(props);
    this.state = {
      route: null
    }
  }// constructor

  changeScene = (path, name) => {
    const { drawer, navigator } = this.context;

    this.setState({
      route: path
    });
    navigator.to(path, name);
    drawer.closeDrawer();
  };// changeScene

  render() {
    const { route } = this.state;
    const { logo, headerTitle } = this.props;

    const { theme } = this.context;
    const themeColor = COLOR[`${theme}500`].color;

    return (
      <Drawer
        theme='light'
        style={{
          backgroundColor: COLOR.googleGrey300.color
        }}
      >
        <Drawer.Header
          backgroundColor={themeColor}>
          <View style={styles.header}>
            <Avatar
              size={80}
              image={<Image source={logo}/>}
              borderWidth={0}
              borderRadius={0}
              borderColor='rgba(255,255,255,0.5)'
              backgroundColor={themeColor} />
            <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>{headerTitle}</Text>
          </View>
        </Drawer.Header>

        <Drawer.Section
          items={[{
            icon: 'dashboard',
            value: 'DASHBOARD',
            active: !route || route === 'welcome',
            onPress: () => this.changeScene('welcome'),
            onLongPress: () => this.changeScene('welcome')
          }]}
        />

        <Drawer.Section
          title="PRODUCTS"
          items={[{
            icon: 'shopping-cart',
            value: 'Show Products',
            active: route === 'product_list',
            onPress: () => this.changeScene('product_list'),
            onLongPress: () => this.changeScene('proproduct_listducts')
          }, {
            icon: 'add-shopping-cart',
            value: 'Add A Product',
            active: route === 'add_product',
            onPress: () => this.changeScene('add_product'),
            onLongPress: () => this.changeScene('add_product')
          }]}
        />

        <Drawer.Section
          title="CUSTOMERS"
          items={[{
            icon: 'supervisor-account',
            value: 'Show Customers',
            active: route === 'customer_list',
            onPress: () => this.changeScene('customer_list'),
            onLongPress: () => this.changeScene('customer_list')
          }, {
            icon: 'perm-identity',
            value: 'Add A Customer',
            active: route === 'add_customer',
            onPress: () => this.changeScene('add_customer'),
            onLongPress: () => this.changeScene('add_customer')
          }]}
        />

        <Drawer.Section
          title="SETTINGS"
          items={[{
            icon: 'invert-colors',
            value: 'Change Theme',
            active: route === 'themes',
            onPress: () => this.changeScene('themes'),
            onLongPress: () => this.changeScene('themes')
          }]}
        />
      </Drawer>
    );// return
  }// render
}// Navigation

const styles = {
  header: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16
  },
  text: {
    marginTop: 20
  }
};
