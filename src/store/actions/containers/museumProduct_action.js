import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';

export function get_AntifactByID(id, currentPage, pageSize, user) {
    let data = [];
     
    //let dataPost = values || {};
    //dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    return dispatch => {
        //dispatch(_searching_Antifact());
        fetch(`${AppConfig.GET_ANTIFACT_BYID}${id}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_ANTIFACT_DETAILError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    data = responseJson
                    dispatch(_search_ANTIFACT_DETAIL(data));

                }
                else {
                    dispatch(_seach_ANTIFACT_DETAILError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_ANTIFACT_DETAILError());
            });
    };
}
function _search_ANTIFACT_DETAIL(data) {
    return {
        type: types.SEARCH_ANTIFACT_DETAIL,
        data: data,
        isLoading: false,
        valuesForm: null
    };
}

function _searching_ANTIFACT_DETAIL() {
    return {
        type: types.SEARCHING_ANTIFACT_DETAIL,
        isLoading: true
    };
}

function _seach_ANTIFACT_DETAILError() {
    return {
        type: types.SEARCH_ANTIFACT_DETAIL_ERROR,
        searchErorr: true,
        isLoading: false
    };
}
export function clearANTIFACT_DETAILError() {
    return {
        type: types.SEARCH_ANTIFACT_DETAIL_CLEAR_ERROR
    };
}