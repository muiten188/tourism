import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert,
    ScrollView
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
import ItemDividerProduct from '../../components/Item_divider_product';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import YouTube from 'react-native-youtube'
const blockAction = false;
const blockLoadMoreAction = false;

class MuseumDetail extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isSummary: true
        }
        I18n.defaultLocale = "vi";
        I18n.locale = "vi";
        I18n.currentLocale();
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        return (
            <ScrollView style={styles.container}>
                <HeaderContent showButtonLeft={true} headerTitle={"Bảo tàng dân học"}/>
                <Grid style={{ }}>
                    <Row style={styles.rowYoutube}>
                        {/* <YouTube
                            videoId="aJOTlE1K90k"   // The YouTube video ID
                            play={true}             // control playback of video with true/false
                            fullscreen={false}       // control whether the video should play in fullscreen or inline
                            loop={true}             // control whether the video should loop when ended
                            apiKey={'AIzaSyD5kBQtHbhB5M-PJdTpO9asfuUT3TGlQYc'}
                            onReady={e => this.setState({ isReady: true })}
                            onChangeState={e => this.setState({ status: e.state })}
                            onChangeQuality={e => this.setState({ quality: e.quality })}
                            onError={e => this.setState({ error: e.error })}

                            style={{ alignSelf: 'stretch', height: 180, width: '100%' }}
                        /> */}
                    </Row>
                    <Row style={styles.rowBar}>
                        <Grid>
                            <Col>
                                <Button full block transparent iconLeft={true} style={styles.buttonTitle}>
                                    <Icon name="user" size={15} style={styles.textWhile} />
                                    <Text uppercase={false} style={styles.textWhile}>{I18n.t("locationGuide", {
                                        locale: "vn"
                                    })}</Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button full block transparent iconRight={true} style={styles.buttonTitle}>
                                    <Text uppercase={false} style={styles.textWhile}>{I18n.t("finGuider", {
                                        locale: "vn"
                                    })}</Text>
                                    <Icon name="user" size={15} style={styles.textWhile} />
                                </Button>
                            </Col>
                        </Grid>
                    </Row>
                    <Row style={this.state.isSummary ? styles.rowDescription_summary : styles.rowDescription_full}>
                        {!this.state.isSummary ?
                            <ScrollView>
                                <Text>
                                    {`🔥 🔥 NGẠO THIÊN MOBILE - CHÍNH THỨC RA MẮT 05.06.2018. CHƠI LÀ NGHIỀN !!! 🔥🔥

Huynh muội ơi!
🔥 Vào 10h00 ngày 05/06, Siêu phẩm Tiên Hiệp 2018, NGẠO THIÊN MOBILE, chính thức phát hành Open Beta. Cùng Đóa Nhi CHƠI LÀ NGHIỀN nha <3

RẤT RẤT nhiều event nhân VIPcode trong tuần đầu tiên ra mắt, huynh tỷ nhanh nhanh vào Fanpage để cập nhật nhé.`}
                                </Text>
                                <Button onPress={() => { this.setState({ isSummary: true }) }} style={{ position: 'absolute', bottom:-5, right: 0, height: 30, backgroundColor: '#fff', borderWidth: 0 }}>
                                    <Text uppercase={false} style={{ color: '#007db7' }}>
                                        {I18n.t("summary_button", {
                                            locale: "vn"
                                        })}
                                    </Text>
                                </Button>
                            </ScrollView>
                            :
                            <View>
                                <Text>
                                    {this.textEclipse(`🔥 🔥 NGẠO THIÊN MOBILE - CHÍNH THỨC RA MẮT 05.06.2018. CHƠI LÀ NGHIỀN !!! 🔥🔥

Huynh muội ơi!
🔥 Vào 10h00 ngày 05/06, Siêu phẩm Tiên Hiệp 2018, NGẠO THIÊN MOBILE, chính thức phát hành Open Beta. Cùng Đóa Nhi CHƠI LÀ NGHIỀN nha <3

RẤT RẤT nhiều event nhân VIPcode trong tuần đầu tiên ra mắt, huynh tỷ nhanh nhanh vào Fanpage để cập nhật nhé.`)}
                                </Text>
                                <Button onPress={() => { this.setState({ isSummary: false }) }} style={{ position: 'absolute', top: 78, right: 0, height: 30, backgroundColor: '#fff', borderWidth: 0 }}>
                                    <Text uppercase={false} style={{ color: '#007db7' }}>
                                        {I18n.t("view_more", {
                                            locale: "vn"
                                        })}
                                    </Text>
                                </Button>
                            </View>}
                    </Row>
                    <Row style={{ height: 30 }}>
                        <Text style={styles.titleProduct}>{I18n.t("product", {
                            locale: "vn"
                        })}</Text>
                    </Row>
                    <Row>
                        <FlatList
                            ref={ref => {
                                this.list = ref;
                            }}
                            style={styles.listResult}
                            data={[{}]}
                            keyExtractor={this._keyExtractor}
                            renderItem={this.renderFlatListItem.bind(this)}
                            numColumns={2}
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
                    </Row>
                </Grid>

            </ScrollView>
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
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
                <ItemDividerProduct></ItemDividerProduct>

            </View>
        );
    }

    _keyExtractor(item, index) {
        return index;
    }

    textEclipse(text) {
        return (((text).length > 125) ?
            (((text).substring(0, 125)) + '...') :
            text)
    }
}
function mapStateToProps(state, props) {
    return {
        museumDetailReducer: state.museumDetailReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        meseumListAction: bindActionCreators(meseumListAction, dispatch)
    };
}

MuseumDetail = connect(mapStateToProps, mapToDispatch)(MuseumDetail);
export default MuseumDetail;
