import React, {
  Component,
  PropTypes,
  View,
  Text,
  ListView,
  TouchableOpacity,
  ProgressBarAndroid
} from 'react-native';

import {
  Button,
  Divider,
  COLOR,
  TYPO
} from 'react-native-material-design';

import {
  customer_list_api,
  isAuthenticated,
  login
} from '../utils/customer_api';

export default class CustomerListview extends Component {

  static contextTypes = {
    navigator: PropTypes.object.isRequired,
    theme: React.PropTypes.string.isRequired
  };// contextTypes

  constructor(props) {
    super(props);
    this.state = {
      customers: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      query_params: {
        limit: 20,
        offset: 0,
        order: "write_date desc"
      }// query_params
    }// this.state

    this.renderCustomer = this.renderCustomer.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }// constructor

  updateCustomers(customers)  {
    this.setState({
      customers: this.state.customers.cloneWithRows(customers),
      loaded: true
    });
  }// updateCustomers

  fetchCustomers(query_params) {
    query_params = query_params || this.state.query_params;
    customer_list_api(query_params, (err, customers) => {
      if(err) {
        if(!isAuthenticated(err)) {
          console.log('Not Authenticated! Attempting to authenticate!');
          login(null, null, () => this.fetchCustomers());
        } else {
          console.log(err);
        }// if
      } else {
        if(customers.results)  {
          this.updateCustomers(customers.results);
        } else {
          console.log('Missing results key in customers results');
        }// if-else
      }// if-else
    });// customer_list_api
  }// fetchCustomers

  componentDidMount() {
    this.fetchCustomers();
  }// componentDidMount

  renderLoadingView() {
    const { theme } = this.context;
    const themeColor = COLOR[`${theme}500`].color;

    return (
      <View style={styles.container}>
        <ProgressBarAndroid styleAttr="Large" color={themeColor} />
      </View>
    );// return
  }

  onCustomerRowTouched(item) {
    const { navigator } = this.context;
    navigator.forward(null, null, { customer: item });
  }// onCustomerRowTouched

  renderCustomer(item) {
    // console.log(item);
    return (
      <TouchableOpacity onPress={() => this.onCustomerRowTouched(item) }>
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.priceText}>
                {item.id}
            </Text>
          </View>
          <View style={styles.rightColumn}>
            <View>
              <Text numberOfLines={1} style={styles.nameText}>
                  {item.name}
              </Text>
            </View>
            <Text style={styles.barcodeText}>
                {item.default_code}
            </Text>
          </View>
          <Divider />
        </View>
      </TouchableOpacity>
    )// return
  }// renderCustomer

  renderSeparator(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`}>
        <Divider />
      </View>
    );// return
  }// renderSeparator

  onEndReached()  {
    console.log("ListView end reached.");
  }// onEndReached

  render () {
    const { theme } = this.context;
    const themeColor = COLOR[`${theme}500`].color;

    if(!this.state.loaded)  {
      return this.renderLoadingView();
    }// if

    return (
      <ListView
        dataSource={this.state.customers}
        renderRow={this.renderCustomer}
        renderSeparator={this.renderSeparator}
        onEndReached={this.onEndReached}
        style={styles.listView}
      />
    )// return
  }// render
}// CustomerListview

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.googleGrey300.color
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 5,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  leftColumn: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 5,
    // borderRightColor: 'green',
    // borderRightWidth: 1,
    // borderStyle: 'solid',
  },
  rightColumn: {
    flex: 10,
    paddingLeft: 10,
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  priceText: [
    {
      textAlign: 'center'
    },
    TYPO.paperFontHeadline,
    COLOR.googleGrey700
  ],
  nameText: [
    {
      textAlign: 'left',
      marginBottom: 5,
    },
    TYPO.paperFontHeadline,
    COLOR.googleGrey700
  ],
  barcodeText: [
    {
      textAlign: 'left',
      marginBottom: 5,
    },
    TYPO.paperFontSubhead,
    COLOR.googleGrey500
  ],
  listView: {
    // paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: COLOR.googleGrey300.color
  }
};// styles
