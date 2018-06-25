import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import {
  Container,
  Text,
  Button,
  Content,
  Body,
  Thumbnail,
  Form,
  Item,
  Input,
  H1,
  H2,
  H3
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import IconVector from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as profileAction from "../../store/actions/containers/profile_action";
import Loading from "../../components/Loading";
import User from "../../components/User";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import { RNCamera, FaceDetector } from 'react-native-camera';
const blockAction = false;
const blockLoadMoreAction = false;

class Profile extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }

  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const locale = "vn";
    return (
      <Container style={styles.container}>
        <User></User>
        <Grid style={styles.Grid}>
          <Row style={styles.gridTitleRow}>
            <Text>{I18n.t("pay", {
              locale: "vn"
            })}</Text>
          </Row>
          <Row style={styles.gridContent}>
            <Col>
              <Row style={styles.gridContentItem}>
                <Col>
                  <Button block full transparent style={styles.heightFull}>
                    <IconVector name="qrcode" size={40}></IconVector>
                  </Button>
                  <View style={styles.textItem}>
                    <Text uppercase={false}>{I18n.t("qrcode", {
                      locale: "vn"
                    })}</Text>
                  </View>
                </Col>
                <Col>
                  <Button block full transparent style={styles.heightFull}>
                    <IconVector name="credit-card" size={40}></IconVector>
                  </Button>
                  <View style={styles.textItem}>
                    <Text uppercase={false}>{I18n.t("atm_visa", {
                      locale: "vn"
                    })}</Text>
                  </View>
                </Col>
              </Row>
              <Row style={styles.gridContentItem}>
                <Col>
                  <Button block full transparent style={styles.heightFull}>
                    <Ionicons name="ios-cash" size={40}></Ionicons>
                  </Button>
                  <View style={styles.textItem}>
                    <Text uppercase={false}>{I18n.t("cash", {
                      locale: "vn"
                    })}</Text>
                  </View>
                </Col>
                <Col>
                  <Button block full transparent style={styles.heightFull}>
                    <Ionicons name="ios-more" size={40}></Ionicons>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

        </Grid>
      </Container>
    );
  }


}
function mapStateToProps(state, props) {
  return {
    profileReducer: state.profileReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    profileAction: bindActionCreators(profileAction, dispatch)
  };
}

Profile = connect(mapStateToProps, mapToDispatch)(Profile);
export default Profile;
