import React, {
  Component,
  PropTypes,
  Text,
  View
} from 'react-native';

import {
  COLOR,
  TYPO
} from 'react-native-material-design';

export default class RowItem extends Component {
  constructor(props) {
    super(props);
  }// constructor

  static propTypes = {
    overrides: React.PropTypes.object
  }// propTypes

  static defaultProps = {
    overrides: {}
  }// defaultProps

  render() {
    const { row, leftColumn, rightColumn } = this.props.overrides;
    return (
      <View style={[styles.row, row]}>
        <View style={[styles.leftColumn, leftColumn]}>
          {this.props.children[0]}
        </View>
        <View style={[styles.rightColumn, rightColumn]}>
          {this.props.children[1]}
        </View>
      </View>
    );// return
  }// render
}// RowItem

const styles = {
  row: {
    // flex: 1,
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  leftColumn: {
    flex: 5,
    // borderColor: 'green',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  rightColumn: {
    flex: 5,
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
  }
};// styles
