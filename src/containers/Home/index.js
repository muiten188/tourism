import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  AppState,
  DeviceEventEmitter,
  Vibration
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
  H3,
  Tab, Tabs, TabHeading
} from "native-base";
import styles from "./styles";
import HeaderForm from "../../components/Header_form";
import HeaderContent from "../../components/Header_content";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import { Field, reduxForm } from "redux-form";
import { DateField } from "../../components/Element/Form";
import ItemResult from "../../components/Item_result";
import * as homeAction from "../../store/actions/containers/home_action";
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import * as loginAction from "../../authen/actions/login_action";
import * as helper from '../../helper';
import Beacons from 'react-native-beacons-manager'
import IconVector from 'react-native-vector-icons/FontAwesome';
import MuseumList from '../Museum_list';
import Profile from '../Profile';
import FindGuider from '../Find_guider';
import { BluetoothStatus } from 'react-native-bluetooth-status';

const blockAction = false;
const blockLoadMoreAction = false;
const blockUUID = false;
const timeoutUUID = null;
const eventBeacons = null;
class Home extends Component {
  currentApartment = {};
  static navigationOptions = {
    header: null
  };

  async detectBeacons() {
    // Tells the library to detect iBeacons
    Beacons.detectIBeacons()
    //Beacons.requestWhenInUseAuthorization();
    // Start detecting all iBeacons in the nearby
    try {
      await Beacons.startRangingBeaconsInRegion('REGION1')
      console.log(`Beacons ranging started succesfully!`)
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`)
    }
  }

  async stopDetectBeacon() {
    try {
      await Beacons.stopRangingBeaconsInRegion('REGION1')
      console.log(`Beacons ranging started succesfully!`)
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`)
    }
  }

  constructor(props) {
    super(props);
    // Print a log of the detected iBeacons (1 per second)
    this.showMessage = false;
    this.current_uuid = {};
    this.listBeacons = [];
    this.indexScanerBeacon = 0;
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

  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].uuid == obj.uuid && list[i].major == obj.major && list[i].minor == obj.minor) {
        return true;
      }
    }

    return false;
  }

  onEventBeacon() {
    eventBeacons = DeviceEventEmitter.addListener('beaconsDidRange', async (data) => {
      console.log('Tìm thấy beacon:', data.beacons)
      if (Actions.currentScene == 'productList') {
        return;
      }
      if (AppState.currentState != "active") {
        return;
      }
      if (data.beacons && data.beacons.length > 0 && blockAction == false) {
        const isEnabled = await BluetoothStatus.state();
        if (!isEnabled) {
          return;
        }
        //blockAction = true;
        for (var i = 0; i < data.beacons.length; i++) {
          if (!this.containsObject(data.beacons[i], this.listBeacons) && data.beacons[i].distance < 1.2) {
            this.listBeacons.push(data.beacons[i]);
          }
        }
        this.indexScanerBeacon = this.indexScanerBeacon + 1;
        if (this.indexScanerBeacon <= 3) {
          return;
        }
        this.listBeacons.sort(function (a, b) { return a.distance > b.distance });
        if (this.listBeacons.length == 0) {
          return;
        }
        var objectBeacon = { uuid: this.listBeacons[0].uuid, major: this.listBeacons[0].major, minor: this.listBeacons[0].minor }
        console.log('array merge', this.listBeacons)
        if (JSON.stringify(this.current_uuid) != JSON.stringify(objectBeacon)) {
          this.current_uuid = objectBeacon;
          if (this.showMessage) {
            return;
          }

          this.showMessage = true;
          Vibration.vibrate(500)
          Alert.alert(I18n.t('report'), I18n.t('foundBeacon'), [{
            text: 'Ok',
            onPress: (e) => {
              Actions.productList({ beaconUUID: this.current_uuid.uuid + this.current_uuid.major + this.current_uuid.minor })
              setTimeout(() => {
                this.current_uuid = {};
              }, 10000);
              this.showMessage = false;
            }
          },
          {
            text: 'Cancel',
            onPress: () => { this.showMessage = false; console.log('Cancel Pressed') }, style: 'cancel'
          }],
            { cancelable: false });
        }
        //console.log('Tìm thấy beacon:', this.listBeacons[0].uuid)
        setTimeout(() => {
          blockAction = false;
        }, 8000);
        this.listBeacons = [];
        
        this.indexScanerBeacon = 0;
      }

      // if (data.beacons && data.beacons.length > 0) {

      //   if (data.beacons[0].uuid != current_uuid) {
      //     alert('Tìm thấy beacon:', data.beacons[0].uuid)
      //     current_uuid = data.beacons[0].uuid;
      //     if (Actions.currentScene == 'productList') {
      //       return;
      //     }
      //     if (this.showMessage) {
      //       return;
      //     }
      //     this.showMessage = true;
      //     Alert.alert(I18n.t('report'), 'Tìm thấy beacon bạn checkin bạn có muốn lấy thông tin hiện vật.', [{
      //       text: 'Ok',
      //       onPress: (e) => {
      //         Actions.productList({ beaconUUID: current_uuid })
      //         this.showMessage = false;
      //       }
      //     },
      //     {
      //       text: 'Cancel',
      //       onPress: () => { this.showMessage = false; console.log('Cancel Pressed') }, style: 'cancel'
      //     }],
      //       { cancelable: false });

      //     //get_AntifactByUUID({ beaconUUID: current_uuid });
      //     //blockUUID = true;
      //     // if (timeoutUUID) {
      //     //   clearTimeout(timeoutUUID);
      //     // }
      //     // setTimeout(() => {
      //     //   current_uuid = null;
      //     // }, 30000);

      //   }
      //   console.log('Tìm thấy beacon:', data.beacons[0].uuid)
      // }
    })
  }

  componentDidMount() {
    const { get_AntifactByUUID } = this.props.homeAction;
    const { setUser } = this.props.loginAction;
    helper.getAsyncStorage("@userLogin", (promise) => {
      promise.done((value) => {
        if (value != '' && value != null) {
          var user = JSON.parse(value);
          setUser(user);
        }
      })
    })
    AppState.addEventListener('change', this._handleAppStateChange.bind(this));
    this.onEventBeacon();
    this.detectBeacons();
  }

  componentWillUnmount() {
    if (eventBeacons) {
      eventBeacons.remove();
      this.stopDetectBeacon();
    }
    AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
  }

  _handleAppStateChange(nextAppState) {
    if (nextAppState == "active") {
      this.onEventBeacon();
      this.detectBeacons();
    }
    else {
      if (eventBeacons) {
        eventBeacons.remove();
        this.stopDetectBeacon();
      }
    }

  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props.navigation;
    const { isLoading, listResult } = this.props.homeReducer;
    // if (this.loading.getState() == true) {
    //   this.loading.hide();
    // }
    // if (this.smallLoading.getState() == true) {
    //   this.smallLoading.hide();
    // }
    // if (
    //   listResult.length == 1 &&
    //   listResult[0].apartmentId != this.currentApartment.apartmentId
    // ) {
    //   if (!blockAction) {
    //     blockAction = true;
    //     this.currentApartment = listResult[0];
    //     //push
    //     setTimeout(() => {
    //       blockAction = false;
    //     }, 700);
    //   }
    // }
  }

  render() {
    const locale = "vn";
    const { dispatch } = this.props.navigation;
    const {
      listResult,
      isLoading,
      searchErorr,
      valuesForm,
      currentPage,
      pageSize,
      loadEnd
    } = this.props.homeReducer;
    blockLoadMoreAction = loadEnd;
    const { homeAction } = this.props;
    const { user } = this.props.loginReducer;
    if (searchErorr == true) {
      Alert.alert(
        "Thông báo",
        "Tìm kiếm lỗi kiểm tra lại đường truyền.",
        [
          {
            text: "Ok",
            onPress: e => {
              homeAction.clearError();
            }
          }
        ],
        { cancelable: false }
      );
    }
    return (

      <Container style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container_outer}
          keyboardVerticalOffset={-350}
        >
          <Grid>
            <Col size={68} style={[styles.grid_col, styles.col_content]}>
              <View style={{ position: 'absolute', bottom: 4, left: 4, width: 34, height: 34 }}>
                <Loading ref={ref => {
                  this.smallLoading = ref;
                }} />
              </View>
              <HeaderContent />
              <View style={styles.listResult_container}>
                <Tabs initialPage={0} locked={true} tabBarUnderlineStyle={styles.tabBarUnderlineStyle} style={{ backgroundColor: 'transparent' }}>
                  <Tab
                    heading={<TabHeading style={styles.tabHeading}>
                      <Grid>
                        <Row style={styles.iconTab}>
                          <IconVector name="home" size={20} />
                        </Row>
                        <Row style={styles.textHeadingTab}>
                          <Text style={styles.textHeaderTab}>{I18n.t("home")}</Text>
                        </Row>
                      </Grid>
                    </TabHeading>}>
                    <MuseumList />
                  </Tab>
                  {/* <Tab heading={<TabHeading style={[styles.tabHeading, { width: 100 }]}>
                    <Grid>
                      <Row style={styles.iconTab}>
                        <IconVector name="users" size={20} />
                      </Row>
                      <Row style={styles.textHeadingTab}>
                        <Text style={styles.textHeaderTab}>
                          {I18n.t("findGuider", {
                            locale: "vn"
                          })}</Text>
                      </Row>
                    </Grid>

                  </TabHeading>}>
                    <FindGuider />
                  </Tab> */}
                  <Tab heading={<TabHeading style={styles.tabHeading}>
                    <Grid>
                      <Row style={styles.iconTab}>
                        <IconVector name="user" size={20} />
                      </Row>
                      <Row style={styles.textHeadingTab}>
                        <Text style={styles.textHeaderTab}>{I18n.t("profile")}</Text>
                      </Row>
                    </Grid>
                  </TabHeading>}>
                    <Profile />
                  </Tab>
                </Tabs>
                <Loading
                  ref={ref => {
                    this.loading = ref;
                  }}
                  isShow={isLoading}
                />
              </View>
            </Col>
          </Grid>
        </KeyboardAvoidingView>
      </Container >
    );
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    const { dispatch } = this.props.navigation;
    const { listResult } = this.props.homeReducer;
    return (
      <TouchableOpacity
        key={item.index}
        style={styles.item_container_full
        }
        onPress={() => {
          if (!blockAction) {
            blockAction = true;
            setTimeout(() => {
              blockAction = false;
            }, 800);
          }
        }}
      >
        <ItemResult
          key={item.index}
          userName={item.ownerName}
          position={item.apartmentName}
          phone={item.ownerPhone}
          avatarUrl={item.avatarUrl}
          item={item}
        />
        {item.paymentStatus == true ? <Icon style={styles.check_half} name="check"></Icon> : null}

      </TouchableOpacity>
    );
  }
  _keyExtractor(item, index) {
    return index;
  }
}
function mapStateToProps(state, props) {
  return {
    homeReducer: state.homeReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    homeAction: bindActionCreators(homeAction, dispatch),
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}
// export default reduxForm({
//   form: "search"
// })(connect(mapStateToProps, mapToDispatch)(search));

// search = reduxForm({
//   form: "search"
//   // enableReinitialize: true
// })(search);
Home = connect(mapStateToProps, mapToDispatch)(Home);
export default Home;
