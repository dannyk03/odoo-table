import React, { Component, PropTypes, View, Image, Text } from 'react-native';
import { Card, Button, COLOR, PRIMARY_COLORS, TYPO } from 'react-native-material-design';

import AppStore from '../stores/AppStore';

export default class Welcome extends Component {

  static contextTypes = {
    navigator: PropTypes.object.isRequired,
    theme: React.PropTypes.string.isRequired
  };// contextTypes

  render() {
    const { navigator, theme } = this.context;
    const themeColor = COLOR[`${theme}500`].color;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          You have no products
        </Text>
        <Text style={styles.subheader}>
          Tap below to start selling and watch your business grow.
        </Text>
        <Card style={styles.card}>
          <Card.Media
            image={
              <Image
                source={require('./../img/welcome.jpg')}
                opacity={0.2}
              />
          }
            >
          </Card.Media>
          <Card.Body>
            <Button
              text="ADD A PRODUCT"
              raised={true}
              overrides={{
                textColor: '#ffffff',
                backgroundColor: themeColor
              }}
              onPress={() => console.log('Add-A-Product Button Pressed!') }
              />
          </Card.Body>
        </Card>
      </View>
    );// return
  }// render
}// Welcome

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.googleGrey300.color
  },
  card: {
    width: 320,
    borderRadius: 0,
    backgroundColor: COLOR.googleGrey100.color
  },
  header: [
    {
      paddingBottom: 20
    },
    TYPO.paperFontHeadline,
    COLOR.googleGrey700
  ],
  subheader: [
    {
      textAlign: 'center',
      paddingBottom: 20
    },
    TYPO.paperFontHeadline,
    COLOR.googleGrey500
  ]
};
