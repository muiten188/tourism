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
        return (
            <Container>
                <HeaderContent headerTitle={"Qr Code"}
                    showButtonLeft={true}
                    hideRightButton={true}></HeaderContent>
            </Container>
        );
    }
}
export default newPreview;
