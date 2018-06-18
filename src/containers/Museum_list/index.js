import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl
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
    H6,
    Picker
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import * as meseumListAction from "../../store/actions/containers/museumList_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ItemResult from '../../components/Item_result';
import ItemDivider from '../../components/Item_divider';

import { Actions, Router, Scene, Stack } from 'react-native-router-flux';

const blockAction = false;
const blockLoadMoreAction = false;

class MuseumList extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            areaId: null
        }
        I18n.defaultLocale = "vi";
        I18n.locale = "vi";
        I18n.currentLocale();
    }

    componentDidMount() {
        const { search_Museum, get_Area } = this.props.meseumListAction;
        get_Area(null, 1, 100, null);
        //search_Museum(null, 1, 100, null);
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        const { listMuseum, listArea, searchErorr, isLoading } = this.props.museumListReducer;
        const { search_Museum, clearMuseumError, clearAreaError } = this.props.meseumListAction;
        if (searchErorr == true) {
            Alert.alert(
                "Thông báo",
                "Tìm kiếm lỗi kiểm tra lại đường truyền.",
                [
                    {
                        text: "Ok",
                        onPress: e => {
                            clearMuseumError();
                        }
                    }
                ],
                { cancelable: false }
            );
        }
        return (
            <Container style={styles.container}>
                <Grid style={{ marginBottom: 45 }}>
                    <Row style={{ height: 50 }}>
                        <Col><Text style={styles.textSide}>Chọn địa danh</Text></Col>
                        <Col><Picker
                            mode="dropdown"
                            iosHeader="Select your SIM"
                            // iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{ width: undefined }}
                            selectedValue={this.state.areaId}
                            onValueChange={(value) => {
                                this.setState({ areaId: value })
                                search_Museum(value ? { areaId: value } : null, 1, 100, null);
                            }}
                        >
                            <Picker.Item label="Tất cả" value={null} />
                            {listArea.map((item, index) => {
                                return (<Picker.Item key={index} label={item.areaName} value={item.areaId} />)
                            })}
                        </Picker></Col>
                    </Row>
                    <Row>
                        <FlatList
                            ref={ref => {
                                this.list = ref;
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={["#9Bd35A", "#689F38"]}
                                    refreshing={isLoading}
                                    onRefresh={() => {
                                        //this.loading.show();
                                        setTimeout(() => {
                                            search_Museum(null, 1, 10, null);
                                        }, 0);

                                    }
                                    }
                                />
                            }
                            style={styles.listResult}
                            data={listMuseum}
                            keyExtractor={this._keyExtractor}
                            renderItem={this.renderFlatListItem.bind(this)}
                            horizontal={false}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            onEndReached={({ distanceFromEnd }) => {
                                if (distanceFromEnd > 0) {
                                    // // this.onEndReachedCalledDuringMomentum = true;
                                    // if (
                                    //     !blockLoadMoreAction &&
                                    //     !(listResult.length < pageSize)
                                    // ) {

                                    //     blockLoadMoreAction = true;
                                    //     this.smallLoading.show(),
                                    //         setTimeout(() => {
                                    //             searchAction.loadMore(
                                    //                 valuesForm,
                                    //                 currentPage,
                                    //                 pageSize,
                                    //                 user
                                    //             )
                                    //         }, 0);

                                    //     setTimeout(() => {
                                    //         if (loadEnd != true) {
                                    //             blockLoadMoreAction = false;
                                    //         }
                                    //     }, 700);
                                    // }
                                }
                            }}
                            onEndReachedThreshold={0.7}
                        />
                        <Loading
                            ref={ref => {
                                this.loading = ref;
                            }}
                            isShow={isLoading}
                        />
                    </Row>
                </Grid>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 45,
                    opacity: 0.9,
                    backgroundColor: '#007db7'
                }}>
                    <Button full block transparent>
                        <IconIonicons name="md-qr-scanner" size={20} style={{ color: '#fff' }} />
                        <Text uppercase={false} style={{ color: '#fff', paddingTop: 0 }}>{I18n.t("guideText", {
                            locale: "vn"
                        })}</Text>
                    </Button>
                </View>
            </Container>
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
        console.log(item);
        return (
            <View
                key={item.index}
                style={
                    styles.item_container_half
                }
                onPress={() => {
                    // if (!blockAction) {
                    //     blockAction = true;

                    // }
                }}
            >
                <ItemDivider data={item}></ItemDivider>
            </View>
        );
    }

    _keyExtractor(item, index) {
        return index;
    }
}
function mapStateToProps(state, props) {
    return {
        museumListReducer: state.museumListReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        meseumListAction: bindActionCreators(meseumListAction, dispatch)
    };
}

MuseumList = connect(mapStateToProps, mapToDispatch)(MuseumList);
export default MuseumList;
