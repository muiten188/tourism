import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView,
    Linking,
} from "react-native";
import {
    Container,
    Text,
    Button,
    Form
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import HeaderContent from "../../components/Header_content";
import { Field, reduxForm } from "redux-form";
import { InputField } from "../../components/Element/Form";
import * as changePasswordAction from '../../store/actions/containers/changePassword_action';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import Header_content from "../../components/Header_content";
import * as helper from '../../helper';
import user from "../../components/User";
import Loading from "../../components/Loading";
const currentQrCode = null;
const validate = values => {
    const error = {};
    error.password = "";
    error.newPassword = "";
    error.confirmPassword = "";
    var newPassword = values.newPassword;
    var confirmPassword = values.confirmPassword;
    var password = values.password;
    if (values.password === undefined) {
        password = "";
    }
    if (values.confirmPassword === undefined) {
        confirmPassword = "";
    }
    if (values.newPassword === undefined) {
        newPassword = "";
    }
    if (password.length == 0 || password == "") {
        error.password = "trống";
    }
    if (newPassword.length == 0 || newPassword == "") {
        error.newPassword = "trống";
    }
    if (confirmPassword.length == 0 || confirmPassword == "") {
        error.confirmPassword = "trống";
    }
    if (confirmPassword !== newPassword) {
        error.confirmPassword = "không khớp";
    }
    return error;
};
class changePassword extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
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
    componentDidUpdate(prevProps, prevState) {
        const { changePasswordError, changePasswordSuccess } = this.props.changePasswordReducer;
        const { clearchangePasswordError } = this.props.changePasswordAction;
        if (changePasswordError) {
            Alert.alert(I18n.t("report"), I18n.t("changePasswordError"), [{
                text: 'Ok',
                onPress: (e) => {
                    clearchangePasswordError();
                }
            }],
                { cancelable: false });
        }
        else if (changePasswordSuccess) {
            Alert.alert(I18n.t("report"), I18n.t("changePasswordSuccess"), [{
                text: 'Ok',
                onPress: (e) => {
                    clearchangePasswordError();
                    Actions.pop();
                }
            }],
                { cancelable: false });
        }
    }

    render() {
        const { changePasswordAction, handleSubmit, submitting, changePasswordReducer } = this.props;
        const { user } = this.props.loginReducer;
        const{isLoading}=this.props.changePasswordReducer;
        return (
            <Container>
                <HeaderContent headerTitle={I18n.t('changePassword')}
                    showButtonLeft={true}
                    hideRightButton={true}></HeaderContent>
                <View style={styles.form}>
                    <Form style={styles.formIn}>
                        <View style={styles.item}>
                            {/* <Icon active name="lock" /> */}
                            <Field
                                icon="key"
                                style={{ height: 50 }}
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
                                name="newPassword"
                                style={{ height: 50 }}
                                placeholder={I18n.t("newPassword")}
                                secureTextEntry={true}
                                component={InputField}
                            />
                        </View>
                        <View style={styles.item}>
                            {/* <Icon active name="lock" /> */}
                            <Field
                                icon="key"
                                name="confirmPassword"
                                style={{ height: 50 }}
                                placeholder={I18n.t("confirmPassword")}
                                secureTextEntry={true}
                                component={InputField}
                            />
                        </View>
                        <Button
                            full
                            style={[styles.buttonLogin, { backgroundColor: '#007db7', paddingLeft: 6, paddingRight: 6, marginTop: 6 }]}
                            onPress={handleSubmit((values) => { changePasswordAction.changePassword(values, user) })}
                        >
                            <Text>
                                {I18n.t("changePassword")}
                            </Text>
                        </Button>
                    </Form></View>
                <Loading isShow={isLoading}></Loading>
            </Container>

        );
    }

    textEclipse(text) {
        return (((text).length > 125) ?
            (((text).substring(0, 125)) + '...') :
            text)
    }
}
function mapStateToProps(state, props) {
    return {
        changePasswordReducer: state.changePasswordReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        changePasswordAction: bindActionCreators(changePasswordAction, dispatch)
    };
}

changePassword = reduxForm({
    form: "changePasswordForm",
    validate,
    enableReinitialize: true
})(changePassword);
changePassword = connect(mapStateToProps, mapToDispatch)(changePassword);
export default changePassword;
