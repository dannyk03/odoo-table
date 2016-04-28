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
  product_detail_api
} from '../utils/product_api';

export default class ProductDetailView extends Component {

  static contextTypes = {
    navigator: PropTypes.object.isRequired,
    theme: React.PropTypes.string.isRequired
  };// contextTypes

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loaded: false,
      details: null,
      loadingDetails: false
    }
  }// constructor

  fetchProduct(barcode) {
    product_detail(barcode, (err, product) => {
      if(err) {
        console.log(err);
      } else {
        if(product.results)  {
          this.updateProduct(product.results);
        } else {
          console.log('Missing results key in product detail results');
        }// if-else
      }// if-else
    });// product_detail
  }// fetchProduct

  fetchProductDetails() {
    const barcode = this.state.product.default_code;
    if(barcode) {
      this.setState({
        loadingDetails: true
      });// this.setState

      product_detail_api(barcode, (err, details) => {
        if(err) {
          console.log(err);
        } else {
          if(details.results)  {
            this.updateProductDetails(details.results);
          } else {
            console.log('Missing results key in product details');
          }// if-else
        }// if-else
      });// product_detail_api
    }// if
  }// fetchProductDetails

  updateProduct(product)  {
    this.setState({
      product: product,
      loaded: true
    });
  }// updateProduct

  updateProductDetails(details) {
    this.setState({
      details: details,
      loadingDetails: false
    });
  }// updateProductDetails

  componentDidMount() {
    this.setState({
      product: this.props.product,
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

    if (this.state.loadingDetails)  {
      return this.renderLoadingView();
    } else if(this.state.details) {
      return (
        <View>
          <RowItem>
            <Text style={styles.detailLabel}>CATEGORY:</Text>
            <Text style={styles.detailText}>{this.state.details[0].categ_id[1]}</Text>
          </RowItem>
          <RowItem>
            <Text style={styles.detailLabel}>SALES COUNT:</Text>
            <Text style={styles.detailText}>{this.state.details[0].sales_count}</Text>
          </RowItem>
          <RowItem>
            <Text style={styles.detailLabel}>QTY AVAILABLE:</Text>
            <Text style={styles.detailText}>{this.state.details[0].qty_available}</Text>
          </RowItem>
          <RowItem>
            <Text style={styles.detailLabel}>TYPE:</Text>
            <Text style={styles.detailText}>{this.state.details[0].type === 'consu' ? 'Consumable' : 'Stockable'}</Text>
          </RowItem>
        </View>
      );// return
    } else if(!this.state.details)  {
      return (
        <Button
          text="SHOW MORE DETAILS"
          raised={true}
          onPress={() => this.fetchProductDetails() }
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
                {this.state.product.name}
            </Text>
          </Card.Media>
          <Card.Body>
            <RowItem>
              <Text style={styles.detailLabel}>PRICE:</Text>
              <Text style={styles.detailText}>${this.state.product.list_price}</Text>
            </RowItem>
            <RowItem>
              <Text style={styles.detailLabel}>BARCODE:</Text>
              <Text style={styles.detailText}>{this.state.product.default_code}</Text>
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
}// ProductDetailView

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
