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
import * as loginAction from "../../actions/login_action";
import I18n from "../../../i18n/i18n";
import { Field, reduxForm } from "redux-form";
import { InputField } from "../../../components/Element/Form";
import Loading from "../../../components/Loading";
import { Actions } from "react-native-router-flux";
import * as helper from "../../../helper";
const username = "";
const password = "";
const confirmPassword="";
const fullName="";
const validate = values => {
  const error = {};
  error.username = "";
  error.password = "";
  error.confirmPassword="";
  error.fullName="";
  var username = values.username;
  var password = values.password;
  var confirmPassword=values.confirmPassword;
  var fullName=values.fullName;
  if (values.username === undefined) {
    username = "";
  }
  if (values.password === undefined) {
    password = "";
  }
  if (values.confirmPassword === undefined) {
    confirmPassword = "";
  }
  if (values.fullName === undefined) {
    fullName = "";
  }
  if (username.length == 0 || username == "") {
    error.username = "trống";
  }
  if (password.length == 0 || password == "") {
    error.password = "trống";
  }
  if (confirmPassword.length == 0 || confirmPassword == "") {
    error.confirmPassword = "trống";
  }
  if (fullName.length == 0 || fullName == "") {
    error.fullName = "trống";
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
      }
    };
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }

  componentDidMount() {
    const { loginAction } = this.props;
    const { loginReducer } = this.props;
    try {
      const hadUser = AsyncStorage.getItem("@userLogin")
        .then(value => {
          let userLogin = JSON.parse(value);
          if (userLogin && loginReducer.Logout) {
            loginAction.setFormLogin(userLogin);
          } else if (
            userLogin &&
            userLogin.username != "" &&
            userLogin.password != ""
          ) {
            loginAction.setFormLogin(userLogin);
            loginAction.login(userLogin);
          }
        })
        .done();
    } catch (error) {
      //error
    }
  }

  onValueChange(value) {
    this.setState({
      languageSelect: value
    });
  }

  render() {
    const { loginAction, handleSubmit, submitting, loginReducer } = this.props;
    const locale = "vn";
    if (
      loginReducer.Logged != null &&
      loginReducer.Logged == false &&
      loginReducer.Loging == false
    ) {
      Alert.alert("Thông báo", "Đăng nhập thất bại");
      loginReducer.Logged = null;
    }

    return (
      <Container

      >

        <Loading isShow={loginReducer.Loging} />
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
                    <Field
                      icon="user-circle-o"
                      name="fullName"
                      placeholder={I18n.t("fullName", {
                        locale: locale ? locale : "vi"
                      })}
                      component={InputField}
                    />
                  </View>
                  <View style={styles.item}>
                    {/* <Icon active name="person" /> */}
                    <Field
                      icon="user-circle-o"
                      name="username"
                      placeholder={I18n.t("account", {
                        locale: locale ? locale : "vi"
                      })}
                      component={InputField}
                    />
                  </View>
                  <View style={styles.item}>
                    {/* <Icon active name="lock" /> */}
                    <Field
                      icon="key"
                      name="password"
                      placeholder={I18n.t("password", {
                        locale: locale ? locale : "vi"
                      })}
                      secureTextEntry={true}
                      component={InputField}
                    />
                  </View>
                  <View style={styles.item}>
                    {/* <Icon active name="lock" /> */}
                    <Field
                      icon="key"
                      name="confirmPassword"
                      placeholder={I18n.t("confirmPassword", {
                        locale: locale ? locale : "vi"
                      })}
                      secureTextEntry={true}
                      component={InputField}
                    />
                  </View>
                  <Button
                    full
                    style={[styles.buttonLogin, { backgroundColor: '#007db7' }]}
                    onPress={handleSubmit(loginAction.login)}
                  >
                    <Text>
                      {I18n.t("register", {
                        locale: this.state.languageSelect
                          ? this.state.languageSelect
                          : "vi"
                      })}
                    </Text>
                  </Button>
                  <Grid>
                    <Row>
                      <Button transparent block dark style={[styles.buttonLogin]}
                        onPress={() => {
                          Actions.reset('login');
                        }}>
                        <Text uppercase={false} >
                          {I18n.t("login", {
                            locale: this.state.languageSelect
                              ? this.state.languageSelect
                              : "vi"
                          })}
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
    loginReducer: state.loginReducer,
    initialValues: state.loginReducer.userForm
      ? state.loginReducer.userForm
      : {
        username: "",
        password: ""
      }
  };
}
function mapToDispatch(dispatch) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}

register = reduxForm({
  form: "LoginForm",
  validate,
  enableReinitialize: true
})(register);
register = connect(mapStateToProps, mapToDispatch)(register);
export default register;
