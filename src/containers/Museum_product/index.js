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
import * as meseumProductAction from "../../store/actions/containers/museumProduct_action";
import Loading from "../../components/Loading";
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ItemResult from '../../components/Item_result';
import ItemDividerProduct from '../../components/Item_divider_product';
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import Slideshow from 'react-native-slideshow';
import * as AppConfig from "../../config/app_config";
import * as helper from '../../helper';
import YouTube from 'react-native-youtube'
const blockAction = false;
const blockLoadMoreAction = false;
const interval = null;
class MuseumProduct extends Component {

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
        const { get_AntifactByID } = this.props.meseumProductAction;
        const { paramPassAction } = this.props;
        interval = setInterval(() => {
            this.setState({
                position: this.state.position === 3 ? 0 : this.state.position + 1
            });
        }, 2000);
        if (paramPassAction && paramPassAction.artId) {
            get_AntifactByID(paramPassAction.artId, 1, 100, null);
        }
    }

    componentWillUnmount() {
        if (interval) {
            clearInterval(interval);
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        const { antifactDetail } = this.props.museumProductReducer;
        var attachments = []
        if (antifactDetail && antifactDetail.attachments) {
            for (var i = 0; i < antifactDetail.attachments.length; i++) {
                var item = antifactDetail.attachments[i];
                if (item.filePath) {
                    var object = {
                        url: AppConfig.API_HOST + item.filePath
                    }
                    attachments.push(object);
                }
            }
        }


        return (
            <Container style={styles.container}>
                <HeaderContent showButtonLeft={true} headerTitle={antifactDetail ? antifactDetail.artName : "..."} />
                <ScrollView>
                    <Grid style={{}}>
                        <Row style={styles.rowYoutube}>
                            <Slideshow
                                height={150}
                                arrowSize={0}
                                position={this.state.position}
                                onPositionChanged={position => this.setState({ position })}
                                dataSource={attachments} />
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
                                    {antifactDetail ? antifactDetail.artDescription : '...'}
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
            </Container>
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
        museumProductReducer: state.museumProductReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        meseumProductAction: bindActionCreators(meseumProductAction, dispatch)
    };
}

MuseumProduct = connect(mapStateToProps, mapToDispatch)(MuseumProduct);
export default MuseumProduct;
