import React, { Component, PropTypes, View, Image, Text } from 'react-native';
import { Card, Button, COLOR, PRIMARY_COLORS, TYPO } from 'react-native-material-design';

import AppStore from '../stores/AppStore';

var Auth0Lock = require('react-native-lock-android');

var lock = new Auth0Lock({
  clientId: "yIdSKR9aGRl4zJwdUKHwynyh6qL97Q0W",
  domain: "saidimu.auth0.com"
});// lock

lock.show({
  connections: ["email"],
  closable: true,
  useMagicLink: false
}, (err, profile, token) => {
  console.log(err);
  console.log(profile);
  console.log(token);
  if(profile && token)  {
    console.log('Logged in!');
  } else {
    console.log('Not logged in!');
  }
});
