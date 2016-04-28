import React, {
  AppRegistry,
  Component,
	Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import codePush from "react-native-code-push";
import SplashScreen from '@remobile/react-native-splashscreen';
import { COLOR } from 'react-native-material-design';

import Navigate from './src/utils/Navigate';
import { Toolbar } from './src/components';
import Navigation from './src/scenes/Navigation';
import routes from './src/routes';

class tablet extends Component {

  static childContextTypes = {
    // drawer: React.PropTypes.object,
    navigator: React.PropTypes.object,
    theme: React.PropTypes.string,
    themeColor: React.PropTypes.string
  };// childContextTypes

  constructor(props) {
    super(props);
    this.state = {
      // drawer: null,
      navigator: null,
      theme: "paperGreen",
      // themeColor: COLOR['paperBlue500'].color
    };

    // require('./src/scenes/Login').default;
  }// constructor

  getChildContext = () => {
    return {
      // drawer: this.state.drawer,
      navigator: this.state.navigator,
      theme: this.state.theme,
      themeColor: this.state.themeColor
    }// return
  };// getChildContext

  componentDidMount() {
    SplashScreen.hide();
    // https://github.com/Microsoft/react-native-code-push#codepushsync
    // Active update, which lets the end user know
    // about each update, and displays it to them
    // immediately after downloading it
    try {
      codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });
    } catch (e) {
      console.warn(e);
    }// try-catch
  }// componentDidMount

  setNavigator = (navigator) => {
    this.setState({
      navigator: new Navigate(navigator)
    });
  }// setNavigator

  onIconPress = ()	=> {
    console.log('Toolbar Icon Pressed');
    // https://github.com/Microsoft/react-native-code-push#codepushsync
    // Active update, which lets the end user know
    // about each update, and displays it to them
    // immediately after downloading it
    codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });
  }// onIconPress

  render() {
    // const { drawer, navigator } = this.state;
    const { navigator } = this.state;
    const navView = React.createElement(Navigation);

    return (
      <Navigator
        initialRoute={Navigate.getInitialRoute(null, routes)}
        navigationBar={<Toolbar onIconPress={this.onIconPress} />}
        configureScene={() => {
          return Navigator.SceneConfigs.FadeAndroid;
        }}
        ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
        renderScene={(route) => {
          if (this.state.navigator && route.component) {
            return (
              <View
                style={styles.scene}
                showsVerticalScrollIndicator={false}>
                <route.component title={route.title} path={route.path} {...route.props} />
              </View>
            );// return
          }
        }}
      /> // Navigator
    );// return
  }// render
}// tablet

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 56
  }
});

AppRegistry.registerComponent('tablet', () => tablet);
