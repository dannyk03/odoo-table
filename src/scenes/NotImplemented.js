import React, { Component, PropTypes, View, Image, Text } from 'react-native';
import { Card, Button, COLOR, PRIMARY_COLORS, TYPO } from 'react-native-material-design';

export default class Welcome extends Component {

  static contextTypes = {
    navigator: PropTypes.object.isRequired,
    theme: React.PropTypes.string.isRequired
  };// contextTypes

  render() {
    const { navigator, theme } = this.context;
    const themeColor = COLOR[`${theme}300`].color;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Hang Tight.
        </Text>
        <Text style={styles.subheader}>
          This screen hasn't yet been implemented.
        </Text>
        <Card style={styles.card}>
          <Card.Body>
            <Button
              text="BACK TO SAFETY"
              raised={true}
              overrides={{
                textColor: '#ffffff',
                backgroundColor: themeColor
              }}
              onPress={() => navigator.to('welcome') }
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
