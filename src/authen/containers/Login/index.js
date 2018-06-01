import React, { Component } from "react";
const FBSDK = require('react-native-fbsdk');
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
const { LoginButton, LoginManager, ShareDialog, AccessToken, GraphRequestManager, GraphRequest } = FBSDK;
import * as helper from "../../../helper";
import PropTypes from 'prop-types';
const username = "";
const password = "";

class login extends React.Component {
  static navigationOptions = {
    header: null
  };

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
      if (result.isCancelled) {
        console.log("Login Cancelled");
      } else {
        console.log("Login Success permission granted:" + result.grantedPermissions);
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            let accessToken = data.accessToken;
            //alert(accessToken.toString());
            
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name'
                  }
                }
              },
              this.responseInfoCallback.bind(this)
            );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();

          })
      }
    }, function (error) {
      console.log("some error occurred!!");
    })
  }


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
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (data) {
          let accessToken = data.accessToken;

          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken: accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name'
                }
              }
            },
            this.responseInfoCallback.bind(this)
          );

          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      })
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
      <View style={{ flex: 1 }}>
        <Loading isShow={loginReducer.Loging} />
        {/* background */}
        <Image
          source={require("../../../resources/assets/splash1.png")}
          style={[styles.backgroundImage]}
        />
        <View style={styles.screen}>
          <View style={styles.loginform}>
            <View style={styles.container_login}>
              <Button block onPress={this._fbAuth.bind(this)} style={[styles.buttonLogin, styles.buttonLoginFb]}>
                <Text>Facebook</Text>
              </Button>
              <Button block style={[styles.buttonLogin, styles.buttonLoginGg]}  >
                <Text>Google</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
  //facebook call back
  responseInfoCallback(error, result) {
    const {loginAction}=this.props;
    if (error) {
      console.log(error)
      //alert('Error fetching data: ' + error.toString());
    } else {
      console.log(result)
      alert('login :' + result.name)
      loginAction.login(result);
      //alert('Success fetching data: ' + result.toString());
    }
  }


}



login.propTypes = {
  loginAction: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  loginReducer: PropTypes.object
};

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

login = reduxForm({
  form: "LoginForm",
  enableReinitialize: true
})(login);
login = connect(mapStateToProps, mapToDispatch)(login);
export default login;
