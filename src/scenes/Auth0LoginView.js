import React, {
  Component
} from 'react-native';

import { COLOR } from 'react-native-material-design';

let Auth0Lock = require('react-native-lock');
let lock = new Auth0Lock({
  clientId: "Qb6G4rW6i2ag3UfnFWSgQx1rV9LxryUI",
  domain: "micromarkets.auth0.com"
});

export function login(callback)  {
  lock.show({
    connections: ["sms"],
    closable: true,
  }, callback);
}// login

// export default class Auth0Login extends Component {
//   static contextTypes = {
//     navigator: React.PropTypes.object.isRequired,
//     theme: React.PropTypes.string.isRequired
//   };// contextTypes
//
//   static propTypes = {
//     onBarcodeReceived: React.PropTypes.func.isRequired
//   };// propTypes
//
//   constructor(props) {
//     super(props);
//
//     this.lock = new Auth0Lock({
//       clientId: "Qb6G4rW6i2ag3UfnFWSgQx1rV9LxryUI",
//       domain: "micromarkets.auth0.com"
//     });
//
//     this.state = {
//       torchMode: 'off',
//       cameraType: 'back',
//     };
//   }
//
//   componentDidMount() {
//     this.lock.show({
//       connections: ["sms"]
//     }, (err, profile, token) => {
//       console.log('Logged in!');
//       console.log(profile);
//       console.log(token);
//     });
//   }
//
//   render() {
//     return null;
//   }// render
// }// Auth0Login
