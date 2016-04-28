import React, {
  Component
} from 'react-native';

import { COLOR } from 'react-native-material-design';

import BarcodeScanner from 'react-native-barcodescanner';

export default class BarcodeScannerView extends Component {
  static contextTypes = {
    navigator: React.PropTypes.object.isRequired,
    theme: React.PropTypes.string.isRequired
  };// contextTypes

  static propTypes = {
    onBarcodeReceived: React.PropTypes.func.isRequired
  };// propTypes

  constructor(props) {
    super(props);

    this.state = {
      torchMode: 'off',
      cameraType: 'back',
    };
  }

  componentDidMount() {
    console.log(this.props);
    // this.barcodeReceived({data: 'xxx', type: 'blah'})
  }

  render() {
    const { theme, navigator } = this.context;
    const themeColor = COLOR[`${theme}500`].color;

    var bgColor = `#904caf50`;
    console.log(bgColor);

    return (
      <BarcodeScanner
        onBarCodeRead={this.props.onBarcodeReceived}
        style={{ flex: 1 }}
        torchMode={this.state.torchMode}
        cameraType={this.state.cameraType}
        viewFinderDrawLaser={true}
        viewFinderBackgroundColor={bgColor}
      />
    );// return
  }// render
}// BarcodeScannerView
