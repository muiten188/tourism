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
import * as guiderAction from "../../store/actions/containers/guider_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ItemResult from '../../components/Item_result';
import ItemDividerProduct from '../../components/Item_divider_product';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import Slideshow from 'react-native-slideshow';
import * as helper from '../../helper';
import YouTube from 'react-native-youtube'
const blockAction = false;
const blockLoadMoreAction = false;

class Guider extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isSummary: true,
            position: 1
        }
        I18n.defaultLocale = "vi";
        I18n.locale = "vi";
        I18n.currentLocale();
    }

    componentDidMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === 3 ? 0 : this.state.position + 1
                });
            }, 4000)
        });
    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        return (
            <ScrollView style={styles.container}>
                <HeaderContent showButtonLeft={true} headerTitle={helper.textEclipse("Chiều hoàng hôn đồng quê", 20)} />
                <Grid style={{}}>
                    <Row style={styles.rowYoutube}>
                        <Slideshow
                            height={150}
                            arrowSize={0}
                            position={this.state.position}
                            onPositionChanged={position => this.setState({ position })}
                            dataSource={[
                                { url: 'https://foto.gettyimages.com/photos/herd-of-bisons-in-yellowstone-picture-id477419964-story-small-0a648a42-9f85-4011-887b-f8927c9dea0d.jpg' },
                                { url: 'http://placeimg.com/640/480/any' },
                                { url: 'https://foto.gettyimages.com/photos/sunrise-shines-on-the-garden-wall-a-spine-of-rock-shaped-by-ice-age-picture-id731750169-story-small-d8ca77e7-6f8a-4b41-aea8-74f5d1565d04.jpg' }
                            ]} />
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
                                {/* <Button full block transparent iconRight={true} style={styles.buttonTitle}>
                                    <Text uppercase={false} style={styles.textWhile}>{I18n.t("finGuider", {
                                        locale: "vn"
                                    })}</Text>
                                    <Icon name="user" size={15} style={styles.textWhile} />
                                </Button> */}
                            </Col>
                        </Grid>
                    </Row>
                    <Row style={styles.rowDescription_full}>
                        <View>
                            <Text>
                                {`🔥 🔥 NGẠO THIÊN MOBILE - CHÍNH THỨC RA MẮT 05.06.2018. CHƠI LÀ NGHIỀN !!! 🔥🔥

Huynh muội ơi!
🔥 Vào 10h00 ngày 05/06, Siêu phẩm Tiên Hiệp 2018, NGẠO THIÊN MOBILE, chính thức phát hành Open Beta. Cùng Đóa Nhi CHƠI LÀ NGHIỀN nha <3

RẤT RẤT nhiều event nhân VIPcode trong tuần đầu tiên ra mắt, huynh tỷ nhanh nhanh vào Fanpage để cập nhật nhé.`}
                            </Text>
                        </View>
                    </Row>
                    <Row style={{ height: 30 }}>
                        <Text style={styles.titleProduct}>{I18n.t("similar_product", {
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
        guiderReducer: state.guiderReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        guiderAction: bindActionCreators(guiderAction, dispatch)
    };
}

Guider = connect(mapStateToProps, mapToDispatch)(Guider);
export default Guider;
