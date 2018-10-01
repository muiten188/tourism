import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';

export function changePassword(values, user) {
    let data = [];
    let dataPost = values || {};
    var objChangePassword = {
        newPassword: dataPost.newPassword,
        oldPassword: dataPost.password,
        username: user.user.userName
    }
    //dataPost = { ...dataPost };
    return async dispatch => {
        //dispatch(_searching_Antifact());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.CHANGE_PASSWORD}`, {
            headers: {
                ..._header, ...{
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            },
            method: "POST",
            body: JSON.stringify(objChangePassword)
        })
            .then(function (response) {
                if (response.status != 200) {
                    dispatch(_seach_changePasswordError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson
                    dispatch(_search_changePassword(data));
                }
                else {
                    dispatch(_seach_changePasswordError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_changePasswordError());
            });
    };
}
function _search_changePassword(data) {
    return {
        type: types.CHANGE_PASSWORD,
        data: data,
        isLoading: false,
        valuesForm: null
    };
}

function _searching_changePassword() {
    return {
        type: types.CHANGING_PASSWORD,
        isLoading: true
    };
}

function _seach_changePasswordError() {
    return {
        type: types.CHANGE_PASSWORD_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearchangePasswordError() {
    return {
        type: types.CLEAR_PASSWORD_ERROR
    };
}