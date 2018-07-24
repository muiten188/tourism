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
    WebView
} from "react-native";
import {
    Container,
    Text,
    Button
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import HeaderContent from "../../components/Header_content";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
class newPreview extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const { news } = this.props;
        return (
            <Container>
                <HeaderContent headerTitle={news.title ? news.title : "Tin tức"}
                    showButtonLeft={true}
                    hideRightButton={true}></HeaderContent>
                <WebView style={{ flex: 1 }} source={{ html: `<html>${news.content}</html>` }} ></WebView>
            </Container>
        );
    }
}
export default newPreview;
