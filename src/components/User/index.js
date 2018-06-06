import React from "react";
const FBSDK = require('react-native-fbsdk');
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  UIManager,
  findNodeHandle,
  AsyncStorage,
  Alert
} from "react-native";
import { Button, Text, Thumbnail, Container, Badge } from "native-base";
import IconVector from "react-native-vector-icons/FontAwesome";
import * as loginAction from "../../authen/actions/login_action";
import * as appAction from "../../store/actions/app_action";
import * as AppConfig from "../../config/app_config";
import styles from "./styles";
import { Actions } from "react-native-router-flux";
import { Grid, Col, Row } from "react-native-easy-grid";
const { LoginButton, LoginManager, ShareDialog, AccessToken, GraphRequestManager, GraphRequest } = FBSDK;
const resolveAssetSource = require("resolveAssetSource");
const userAvar = require("../../resources/assets/user.jpg");
const ICON_SIZE = 24;


class user extends React.Component {
  handleShowPopupError = () => {
    // show error here
  };

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      username: "",
      fullName: "Tên Người Dùng",
      phoneNumber: "",
      birthDay: "",
      email: "",
      avatar: "",
      identification: ""
    };
  }


  componentDidMount() {

  }


  render() {
    const { state } = this;
    return (
      <View style={styles.viewContain}>
        <Grid>
          <Col style={styles.avartarCol}>
            <Thumbnail style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: 'http://images6.fanpop.com/image/photos/40600000/PRISTIN-WE-LIKE-Promotion-Nayoung-pristin-40694319-500-333.jpg' }} />
          </Col>
          <Col style={{
            justifyContent: "center",
            alignItems: "flex-start"
          }}>
            <Row>

            </Row>
            <Row>
              <Text>Đỗ Thành Đạt</Text>
            </Row>
            <Row>
              <Badge primary>
                <Text>VIP</Text>
              </Badge>
            </Row>
            <Row>
              <Text>Ngày hết hạn:10/10/2018</Text>
            </Row>
            <Row>

            </Row>
          </Col>
          <Col style={styles.editCol}>
            <Row style={{ height: 15 }}>

            </Row>
            <Row>
              <Button block full transparent>
                <IconVector name="edit" size={18} />
              </Button>
            </Row>
            <Row>

            </Row>
            <Row>
              <Button block full transparent>
                <IconVector name="sign-out" size={18} />
              </Button>
            </Row>
            <Row>

            </Row>
          </Col>
        </Grid>
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    //loginReducer: state.loginReducer,
  };
}
function mapToDispatch(dispatch) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch),
    appAction: bindActionCreators(appAction, dispatch)
  };
}

user = connect(mapStateToProps, mapToDispatch)(user);
export default user;
