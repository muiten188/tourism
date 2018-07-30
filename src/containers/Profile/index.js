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
import * as loginAction from "../../authen/actions/login_action";
// import { RNCamera, FaceDetector } from 'react-native-camera';
import * as helper from '../../helper';
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
    const { user } = this.props.loginReducer;
  }
  componentDidUpdate(prevProps, prevState) {

  }

  onLogout() {
    const { loginAction } = this.props;
    helper.clearAsyncStorage();
    loginAction.logout();
    // Actions.reset('login');
  }

  render() {
    const locale = "vn";
    const { user } = this.props.loginReducer;
    return (
      <Container style={styles.container}>
        {user ? <User user={user} onLogout={this.onLogout.bind(this)}></User> :
          <Button full
            onPress={() => {
              Actions.login();
            }}
            style={{ margin: 15 }}>
            <Text>Đăng nhập</Text>
          </Button>}
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
    profileAction: bindActionCreators(profileAction, dispatch),
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}

Profile = connect(mapStateToProps, mapToDispatch)(Profile);
export default Profile;
