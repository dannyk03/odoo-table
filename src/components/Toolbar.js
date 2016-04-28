import React, {
  Component,
  PropTypes,
  Text,
  View
} from 'react-native';

import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import AppStore from '../stores/AppStore';

export default class Toolbar extends Component {

  static contextTypes = {
    navigator: PropTypes.object,
    theme: React.PropTypes.string.isRequired
  };

  static propTypes = {
    onIconPress: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      title: AppStore.getState().routeName,
      theme: AppStore.getState().theme
    };
  }

  componentDidMount = () => {
    AppStore.listen(this.handleAppStore);
  };

  componentWillUnmount() {
    AppStore.unlisten(this.handleAppStore);
  }

  handleAppStore = (store) => {
    this.setState({
      title: store.routeName,
      theme: this.context.theme
    });
  };

  render() {
    const { navigator } = this.context;
    const { counter } = this.state;
    const { onIconPress } = this.props;

    const { theme, themeColor } = this.context;

    return (
      <MaterialToolbar
        title={navigator && navigator.currentRoute ? navigator.currentRoute.title : 'Welcome'}
        primary={theme}
        icon={navigator && navigator.isChild ? 'arrow-back' : 'home'}
        onIconPress={() => navigator && navigator.isChild ? navigator.back() : onIconPress()}
        actions={[{
          icon: 'more-vert'
        }]}
        rightIconStyle={{
          margin: 10
        }}
      />
    );
  }
}
