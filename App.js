/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Index from './src';
import { PermissionsAndroid } from 'react-native';


export default class App extends Component {

  componentWillMount() {
    this.requestCameraPermission();
  }
  render() {
    return (
      <Index />
    );
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          'title': 'Thông báo cấp quyền',
          'message': 'Ứng dụng cần quyền vị trí để thao tác với beacon'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
}