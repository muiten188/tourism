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
import * as forgotPasswordAction from "../../actions/forgotPassword_action";
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
  error.email = "";
  var email = values.email;
  if (values.email === undefined) {
    email = "";
  }
  if (email.length == 0 || email == "") {
    error.email = "trống";
  }
  if (validationEmail(email)) {
    error.email = "không phải email.";
  }
  return error;
};

class forgotPassword extends Component {
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

  }

  onValueChange(value) {
    this.setState({
      languageSelect: value
    });
  }

  componentDidUpdate() {
    const { forgotPasswordReducer, forgotPasswordAction } = this.props;
    console.log()
    if (
      forgotPasswordReducer.forgotPasswordError == true
    ) {
      Alert.alert(I18n.t("report"), I18n.t('forgotPasswordFail'), [{
        text: 'Ok',
        onPress: (e) => {
          forgotPasswordAction.clearForgotPasswordError();
        }
      }],
        { cancelable: false });
    }
    else if (forgotPasswordReducer.forgotPasswordSuccess == true) {
      Alert.alert(I18n.t("report"), I18n.t('forgotPasswordSuccess'), [{
        text: 'Ok',
        onPress: (e) => {
          forgotPasswordAction.clearForgotPasswordError();
          Actions.reset('login');
        }
      }],
        { cancelable: false });
    }
  }

  render() {
    const { forgotPasswordAction, handleSubmit, submitting, forgotPasswordReducer } = this.props;
    return (
      <Container

      >

        <Loading isShow={forgotPasswordReducer.registing} />
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
                      name="email"
                      placeholder={I18n.t("email")}
                      component={InputField}
                    />
                  </View>
                  <Button
                    full
                    style={[styles.buttonLogin, { backgroundColor: '#007db7' }]}
                    onPress={handleSubmit((value) => { forgotPasswordAction.forgotPassword(value) })}
                  >
                    <Text>
                      {I18n.t("forgotPassword")}
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
    forgotPasswordReducer: state.forgotPasswordReducer
  }
}
function mapToDispatch(dispatch) {
  return {
    forgotPasswordAction: bindActionCreators(forgotPasswordAction, dispatch)
  };
}

forgotPassword = reduxForm({
  form: "forgotPassword",
  validate,
  enableReinitialize: true
})(forgotPassword);
forgotPassword = connect(mapStateToProps, mapToDispatch)(forgotPassword);
export default forgotPassword;
