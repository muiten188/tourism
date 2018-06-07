import React, { PureComponent, Component } from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  H3,
  H2,
  H1,
  Item,
  Thumbnail
} from "native-base";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";
import User from "../User";
import * as AppConfig from "../../config/app_config";
const resolveAssetSource = require('resolveAssetSource');
const userAvar = require("../../resources/assets/user.jpg")
let text = "Một nét chân quê"
let text2 = "Sản phẩm vải dạng tằm, bề ngang dài 80 mét"
export default class extends PureComponent {
  static navigationOptions = {
    header: null
  };

  render() {
    const { key, userName, position, phone, avatarUrl, item } = this.props;
    return (
      <View key={key} style={styles.itemList}>
        {/* <Thumbnail
          style={styles.thumbnail_avatar}
          source={avatarUrl ? {
            uri: `${avatarUrl}`
          } : userAvar
          }
          ref={(thumbnail) => { this.thumbnail = thumbnail; }}
          onError={(e) => {
            this.thumbnail.setNativeProps({ src: [resolveAssetSource(userAvar)] })
          }}
        /> */}
        <Image
          source={{ uri: avatarUrl }}
          style={styles.imageHotel}
        />
        <View style={styles.context}>
            {/* <View style={styles.conInside}>
              <Text style={styles.textContext}></Text>
            </View> */}
          <Text style={styles.textContextTitle}>{this.textEclipse(text)}</Text>
          <Text style={styles.textContext}>{this.textEclipse(text2)}</Text>
        </View>


      </View>
    );
  }
  textEclipse(text) {
    return (((text).length > 26) ?
      (((text).substring(0, 26)) + '...') :
      text)
  }
}
