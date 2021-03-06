import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';

export function get_AntifactByQRCODE(values, user) {
    let data = [];
    Actions.pop();
    let dataPost = values || {};
    //dataPost = { ...dataPost };
    return async dispatch => {
        //dispatch(_searching_Antifact());
        var _header = await helper.buildHeader(user);
        fetch(`${AppConfig.GET_ANTIFACT_BY_QRCODE}?${helper.getQueryString(dataPost)}`, {
            headers: _header,
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_ANTIFACT_BY_QRCODEError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson
                    //dispatch(_search_ANTIFACT_BY_QRCODE(data));

                    Actions.museumProduct({ paramPassAction: data });
                }
                else {
                    dispatch(_seach_ANTIFACT_BY_QRCODEError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_ANTIFACT_BY_QRCODEError());
            });
    };
}
function _search_ANTIFACT_BY_QRCODE(data) {
    return {
        type: types.SEARCH_ANTIFACT_BY_QRCODE,
        data: data,
        isLoading: false,
        valuesForm: null
    };
}

function _searching_ANTIFACT_BY_QRCODE() {
    return {
        type: types.SEARCHING_ANTIFACT_BY_QRCODE,
        isLoading: true
    };
}

function _seach_ANTIFACT_BY_QRCODEError() {
    return {
        type: types.SEARCH_ANTIFACT_BY_QRCODE_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearANTIFACT_BY_QRCODEError() {
    return {
        type: types.SEARCH_ANTIFACT_BY_QRCODE_CLEAR_ERROR
    };
}