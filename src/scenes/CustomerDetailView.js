import React, {
  Component,
  PropTypes,
  View,
  Text,
  Image,
  ProgressBarAndroid
} from 'react-native';

import {
  Button,
  Divider,
  Card,
  COLOR,
  TYPO
} from 'react-native-material-design';

var numeral = require('numeral');

import RowItem from '../components/RowItem';

import {
  customer_detail_api
} from '../utils/customer_api';

export default class CustomerDetailView extends Component {

  static contextTypes = {
    navigator: PropTypes.object.isRequired,
    theme: React.PropTypes.string.isRequired
  };// contextTypes

  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      loaded: false,
      details: null,
      loadingDetails: false
    }
  }// constructor

  fetchCustomer(barcode) {
    customer_detail(barcode, (err, customer) => {
      if(err) {
        console.log(err);
      } else {
        if(customer.results)  {
          this.updateCustomer(customer.results);
        } else {
          console.log('Missing results key in customer detail results');
        }// if-else
      }// if-else
    });// customer_detail
  }// fetchCustomer

  fetchCustomerDetails() {
    const id = this.state.customer.id;
    if(id) {
      this.setState({
        loadingDetails: true
      });// this.setState

      customer_detail_api(id, (err, details) => {
        if(err) {
          console.log(err);
        } else {
          if(details.results)  {
            this.updateCustomerDetails(details.results);
          } else {
            console.log('Missing results key in customer details');
          }// if-else
        }// if-else
      });// customer_detail_api
    }// if
  }// fetchCustomerDetails

  updateCustomer(customer)  {
    this.setState({
      customer: customer,
      loaded: true
    });
  }// updateCustomer

  updateCustomerDetails(details) {
    this.setState({
      details: details,
      loadingDetails: false
    });
  }// updateCustomerDetails

  componentDidMount() {
    this.setState({
      customer: this.props.customer,
      loaded: true
    });
  }// componentDidMount

  renderLoadingView() {
    const { theme } = this.context;
    const themeColor = COLOR[`${theme}500`].color;

    return (
      <ProgressBarAndroid styleAttr="Normal" color={themeColor} />
    );// return
  }// renderLoadingView

  renderDetailsView() {
    const { theme } = this.context;
    const themeColor = COLOR[`${theme}500`].color;

    return <View></View>;

    if (this.state.loadingDetails)  {
      return this.renderLoadingView();
    } else if(this.state.details) {
      // console.log(this.state.details);
      return (
        <View>
          <RowItem>
            <Text style={styles.detailLabel}># SALE ORDERS:</Text>
            <Text style={styles.detailText}>{this.state.details[0].sale_order_count}</Text>
          </RowItem>
        </View>
      );// return
    } else if(!this.state.details)  {
      return (
        <Button
          text="SHOW MORE DETAILS"
          raised={true}
          onPress={() => this.fetchCustomerDetails() }
          overrides={{
            textColor: '#ffffff',
            backgroundColor: themeColor
          }}
        />
    );// return
    }// if-else
  }// renderDetailsView

  render () {
    if(!this.state.loaded)  {
      return this.renderLoadingView();
    }// if

    // console.log(this.state.customer);

    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Media
            image={<Image source={require('../img/welcome.jpg')} />}
            opacity={0.2}
            overlay
          >
            <Text
              style={
                [TYPO.paperFontHeadline, COLOR.paperGrey50]
              }>
                {this.state.customer.name}
            </Text>
            <Text
              style={
                [TYPO.paperFontSubhead, COLOR.paperGrey50]
              }>
                {this.state.customer.email}
            </Text>
          </Card.Media>
          <Card.Body>
            <RowItem>
              <Text style={styles.detailLabel}>KEYTAG:</Text>
              <Text numberOfLines={1} style={styles.detailText}>{this.state.customer.ref}</Text>
            </RowItem>
            <RowItem>
              <Text style={styles.detailLabel}>TOTAL INVOICED:</Text>
              <Text style={styles.detailText}>${this.state.customer.total_invoiced}</Text>
            </RowItem>
            <RowItem>
              <Text style={styles.detailLabel}># SALE ORDERS:</Text>
              <Text style={styles.detailText}>{this.state.customer.sale_order_count}</Text>
            </RowItem>
            <RowItem>
              <Text style={styles.detailLabel}>ACTIVE:</Text>
              <Text style={styles.detailText}>{this.state.customer.active ? 'true' : 'false'}</Text>
            </RowItem>
            <RowItem>
              <Text style={styles.detailLabel}>ID #:</Text>
              <Text style={styles.detailText}>{this.state.customer.id}</Text>
            </RowItem>
          </Card.Body>
        </Card>

        <Card style={styles.card}>
          <Card.Body>
            {this.renderDetailsView()}
          </Card.Body>
        </Card>
      </View>
    )// return
  }// render
}// CustomerDetailView

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
  },
  detailLabel: [
    {
      textAlign: 'right',
    },
    TYPO.paperFontSubhead,
    {
      fontWeight: '700'
    }
  ],
  detailText: [
    {
      textAlign: 'left',
      marginLeft: 10
    },
    TYPO.paperFontSubhead
  ],
  card: {
    backgroundColor: COLOR.googleGrey100.color
  }
};// styles
