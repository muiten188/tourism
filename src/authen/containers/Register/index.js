import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  AsyncStorage,
  Alert,
  NativeModules
} from "react-native";
import {
  Container,
  Spinner,
  Text,
  Button,
  Header,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Thumbnail,
  Picker,
  Left,
  Right
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import theme from "../../../themes/default/styles";
import * as registerAction from "../../actions/register_action";
import I18n from "../../../i18n/i18n";
import { Field, reduxForm } from "redux-form";
import { InputField } from "../../../components/Element/Form";
import Loading from "../../../components/Loading";
import { Actions } from "react-native-router-flux";
import * as types from "../../../store/constants/action_types";
import * as helper from "../../../helper";
const username = "";
const password = "";
const confirmPassword = "";
const firstName = "";
const lastName = "";

const validationEmail = value => {
  let result = emailError = value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? true
    : false;
  return result;
};

const validate = values => {
  const error = {};
  error.username = "";
  error.email = "";
  error.password = "";
  error.confirmPassword = "";
  error.firstName = "";
  error.lastName = "";
  var username = values.username;
  var email = values.email;
  var password = values.password;
  var confirmPassword = values.confirmPassword;
  var firstName = values.firstName;
  var lastName = values.lastName;
  if (values.username === undefined) {
    username = "";
  }
  if (values.email === undefined) {
    email = "";
  }
  
  if (values.password === undefined) {
    password = "";
  }
  if (values.confirmPassword === undefined) {
    confirmPassword = "";
  }
  if (values.firstName === undefined) {
    firstName = "";
  }
  if (values.lastName === undefined) {
    lastName = "";
  }
  if (username.length == 0 || username == "") {
    error.username = "trống";
  }
  if (email.length == 0 || email == "") {
    error.email = "trống";
  }

  if(validationEmail(email)){
    error.email = "không phải email";
  }
  if (password.length == 0 || password == "") {
    error.password = "trống";
  }
  if (confirmPassword.length == 0 || confirmPassword == "") {
    error.confirmPassword = "trống";
  }
  if (confirmPassword !== password) {
    error.confirmPassword = "không khớp";
  }
  if (firstName.length == 0 || firstName == "") {
    error.firstName = "trống";
  }
  if (lastName.length == 0 || lastName == "") {
    error.lastName = "trống";
  }
  return error;
};

class register extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      languageSelect: "vn",
      selected1: "key1",
      results: {
        items: []
      },
      languageSelect: 'vn',
    };
    this.loadSetting();
  }

  async loadSetting() {
    var lang = await helper.getLangSetting();
    if (lang != null) {
      I18n.locale = lang;
      this.setState({
        languageSelect: lang

      })
    }
  }

  componentDidMount() {
    const { registerAction } = this.props;
    const { registerReducer } = this.props;
  }

  onValueChange(value) {
    this.setState({
      languageSelect: value
    });
  }

  componentDidUpdate() {
    const { registerReducer, registerAction } = this.props;
    if (registerReducer.action && registerReducer.action.type != types.REGISTER_CLEAR) {
      if (
        registerReducer.registed != null &&
        registerReducer.registed == false &&
        registerReducer.registed == false
      ) {
        Alert.alert(I18n.t('report'),I18n.t('registerFail'), [{
          text: 'Ok',
          onPress: (e) => {
            registerAction.clearRegister();
          }
        }],
          { cancelable: false });
      }
      else if (registerReducer.registed == true) {
        Alert.alert(I18n.t('report'), I18n.t('registerSuccess'), [{
          text: 'Ok',
          onPress: (e) => {
            registerAction.clearRegister();
            Actions.reset('login');
          }
        }],
          { cancelable: false });

      }
    }
  }

  render() {
    const { registerAction, handleSubmit, submitting, registerReducer } = this.props;
    return (
      <Container

      >

        <Loading isShow={registerReducer.registing} />
        {/* background */}
        <Image
          source={require("../../../resources/assets/splash1.png")}
          style={[styles.backgroundImage]}
        />

        <View style={styles.screen}>
          <View style={styles.loginform}>
            <Grid style={{ width: '100%' }}>
              <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Form style={styles.form}>
                  <View style={styles.item}>
                    {/* <Icon active name="person" /> */}
                    <Row>
                      <Col>
                        <Field
                          icon="user-circle-o"
                          name="firstName"
                          placeholder={I18n.t("firstName")}
                          component={InputField}
                        />
                      </Col>
                      <Col>
                        <Field
                          icon="user-circle-o"
                          name="lastName"
                          placeholder={I18n.t("lastName")}
                          component={InputField}
                        />
                      </Col>
                    </Row>
                  </View>
                  <View style={styles.item}>
                    {/* <Icon active name="person" /> */}
                    <Field
                      icon="user-circle-o"
                      name="username"
                      placeholder={I18n.t("account")}
                      component={InputField}
                    />
                  </View>
                  <View style={styles.item}>
                    {/* <Icon active name="lock" /> */}
                    <Field
                      icon="inbox"
                      name="email"
                      placeholder={I18n.t("email")}
                      component={InputField}
                    />
                  </View>
                  <View style={styles.item}>
                    {/* <Icon active name="lock" /> */}
                    <Field
                      icon="key"
                      name="password"
                      placeholder={I18n.t("password")}
                      secureTextEntry={true}
                      component={InputField}
                    />
                  </View>
                  <View style={styles.item}>
                    {/* <Icon active name="lock" /> */}
                    <Field
                      icon="key"
                      name="confirmPassword"
                      placeholder={I18n.t("confirmPassword")}
                      secureTextEntry={true}
                      component={InputField}
                    />
                  </View>
                  <Button
                    full
                    style={[styles.buttonLogin, { backgroundColor: '#007db7' }]}
                    onPress={handleSubmit(registerAction.register)}
                  >
                    <Text>
                      {I18n.t("register")}
                    </Text>
                  </Button>
                  <Grid>
                    <Row>
                      <Button transparent block dark style={[styles.buttonLogin]}
                        onPress={() => {
                          Actions.reset('login');
                        }}>
                        <Text uppercase={false} >
                          {I18n.t("login")}
                        </Text>
                      </Button>
                    </Row>
                  </Grid>
                </Form>
              </Row>
            </Grid>
            {/* <GoogleSigninButton
            style={{ width: 212, height: 48 }}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this._googleSignIn.bind(this)}
          /> */}
          </View>
        </View>

      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    registerReducer: state.registerReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    registerAction: bindActionCreators(registerAction, dispatch)
  };
}

register = reduxForm({
  form: "RegisterForm",
  validate,
  enableReinitialize: true
})(register);
register = connect(mapStateToProps, mapToDispatch)(register);
export default register;
