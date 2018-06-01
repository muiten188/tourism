import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Platform, BackHandler, ToastAndroid } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
//list screen
import Login from '../authen/containers/Login';
import Register from '../authen/containers/Register';
import Home from '../containers/Home';

import PropTypes from 'prop-types';

class RootNavigation extends React.Component {
    //Life cycle component
    constructor(props) {
        super(props);
        this._handleBackAction = this.handleBackAction.bind(this);
    }

    componentDidMount() {
        if (Platform.OS == "android") {
            BackHandler.addEventListener('backPress', this._handleBackAction);
        }
    }

    componentWillUnmount() {
        if (Platform.OS == "android") {
            BackHandler.removeEventListener('backPress', this._handleBackAction);
        }
    }
    //component function
    handleBackAction() {
        if (Platform.OS == "android") {
            ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        }
        //pop
    }

    render() {
        return (
            <Router>
                <Stack key="root_authen">
                    <Scene key="login"
                        component={Login}
                        title="Login"
                        initial={true}
                    />
                    <Scene
                        key="register"
                        component={Register}
                        title="Register"
                    />
                    <Scene key="home"
                        component={Home}
                        title="Home"
                        initial={false}
                    />
                </Stack>
            </Router>
        );
    }
}
RootNavigation.propTypes = {

}

function mapStateToProps(state, props) {
    return {
        //navigationReducer: state.navigationReducer,
    }
};
function mapToDispatch(dispatch) {
    return {
        //navigationAction: bindActionCreators(navigationAction, dispatch),
    }
}

export default connect(mapStateToProps, mapToDispatch)(RootNavigation);