import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
const FBSDK = require('react-native-fbsdk');
const { LoginManager } = FBSDK;
import { GoogleSignin } from 'react-native-google-signin';
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
  H3,
  ListItem,
  Left,
  CheckBox,
  Icon,
  Right,
  Picker,
  Card,
  CardItem
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import IconVector from "react-native-vector-icons/FontAwesome";
import IconFeather from 'react-native-vector-icons/Feather';
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
    this.state = {
      backgroundVideo: false,
      notification: false,
      languageSelect: 'vn',
    }
    this.loadLangSetting();
  }

  async loadLangSetting() {
    var lang = await helper.getLangSetting();
    if (lang != null) {
      I18n.locale = lang;
      this.setState({
        languageSelect: lang
      })
    }
  }

  componentDidMount() {
    const { user } = this.props.loginReducer;
    this.loadSetting();
  }

  async loadSetting() {
    var backgroundVideoSetting = await helper.getBackgroundVideoSetting();
    var notifiSetting = await helper.getnotifiSetting()

    if (backgroundVideoSetting != null) {
      this.setState({
        backgroundVideo: backgroundVideoSetting
      })
    }
    if (notifiSetting != null) {
      this.setState({
        notification: notifiSetting
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {

  }

  onLogout() {
    const { loginAction } = this.props;
    helper.clearAsyncStorage();
    loginAction.logout();
    try {
      LoginManager.logOut();
      GoogleSignin.signOut();
    } catch (error) {

    }
    // Actions.reset('login');
  }

  settingVideoChange() {
    this.setState({
      backgroundVideo: !this.state.backgroundVideo
    })
    helper.setAsyncStorage("@backgroundVideo", !this.state.backgroundVideo);
    helper.backgroundVideoSetting = !this.state.backgroundVideo
  }


  onLanguageValueChange(value) {
    I18n.locale = value;
    this.setState({
      languageSelect: value
    });
    helper.setAsyncStorage('@lang', value);
    Actions.push('login');
    Actions.reset('home');
  }

  settingNotifiChange() {
    this.setState({
      notification: !this.state.notification
    })
    helper.setAsyncStorage("@notifi", !this.state.notification);
    helper.notifiSetting = !this.state.notification
  }

  render() {
    const locale = "vn";
    const { user } = this.props.loginReducer;
    debugger;
    return (
      <Container style={styles.container}>
        {user ? <User user={user} onLogout={this.onLogout.bind(this)}></User> :
          <Button full
            onPress={() => {
              Actions.login();
            }}
            style={{ margin: 15, backgroundColor: '#007db7' }}>
            <Text>{I18n.t('login')}</Text>
          </Button>}
        <Grid style={styles.Grid}>
          <Content>
            {user && user.user.email ?
              <Row style={styles.gridTitleRow}>
                <Text style={{ fontWeight: '500' }}>{I18n.t("profile")}</Text>
              </Row> : null}
            {user && user.user.email ? <Row>
              <Card>
                <CardItem>
                  <IconFeather active name="mail" size={18} style={{ marginRight: 6 }} />
                  <Text>{user.user.email}</Text>
                </CardItem>
                {/* <CardItem>
                  <Icon active name="logo-googleplus" />
                  <Text>Google Plus</Text>
                </CardItem>
                <CardItem>
                  <Icon active name="logo-googleplus" />
                  <Text>Google Plus</Text>
                </CardItem>
                <CardItem>
                  <Icon active name="logo-googleplus" />
                  <Text>Google Plus</Text>
                </CardItem>
                <CardItem>
                  <Icon active name="logo-googleplus" />
                  <Text>Google Plus</Text>
                </CardItem>
                <CardItem>
                  <Icon active name="logo-googleplus" />
                  <Text>Google Plus</Text>
                </CardItem>*/}
              </Card>
            </Row> : null}
            <Row style={styles.gridTitleRow}>
              <Text style={{ fontWeight: '500' }}>{I18n.t("setting")}</Text>
            </Row>
            <Row>
              <Content>
                <ListItem icon>
                  <Left>
                    <Button onPress={this.settingVideoChange.bind(this)} style={{ backgroundColor: "#FF9501" }}>
                      <Icon type="Foundation" active name="play-video" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>{I18n.t('backgroundVideo')}</Text>
                  </Body>
                  <Right>
                    <CheckBox onPress={this.settingVideoChange.bind(this)} style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }} checked={this.state.backgroundVideo} />
                  </Right>
                </ListItem>
                {/* <ListItem icon >
                <Left>
                  <Button disabled onPress={this.settingNotifiChange.bind(this)} style={{ backgroundColor: "#FF9501" }}>
                    <Icon type="MaterialIcons" active name="notifications" />
                  </Button>
                </Left>
                <Body>
                  <Text>Thông báo</Text>
                </Body>
                <Right>
                  <CheckBox disabled onPress={this.settingNotifiChange.bind(this)} style={{
                    width: 25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#cecece'
                  }} checked={this.state.notification} />
                </Right>
              </ListItem> */}
                <ListItem icon >
                  <Left>
                    <Button disabled onPress={this.settingNotifiChange.bind(this)} style={{ backgroundColor: "#FF9501" }}>
                      <Icon type="FontAwesome" active name="language" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>{I18n.t('language')}</Text>
                  </Body>
                  <Right>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="ios-arrow-down-outline" />}
                      style={{ width: 135 }}
                      selectedValue={this.state.languageSelect}
                      onValueChange={this.onLanguageValueChange.bind(this)}
                    >
                      <Picker.Item label="Tiếng việt" value="vn" />
                      <Picker.Item label="English" value="en" />
                    </Picker>
                  </Right>
                </ListItem>
              </Content>
            </Row>
            {/* <Row style={styles.gridContent}>
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
          </Row> */}
          </Content>
          {user && user.user.loginMethod == "MANUAL" ? <Row style={{ height: 50, paddingLeft: 6, paddingRight: 6 }}>
            <Button onPress={() => {
              Actions.changePassword();
            }} block full style={{ width: '100%', backgroundColor: '#007db7' }}>
              <Text>{I18n.t('changePassword')}</Text>
            </Button>
          </Row> : null}

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
