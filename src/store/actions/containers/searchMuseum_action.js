import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";

export function QUICK_SEARCH_ANTIFACT(values, user) {
    let data = [];
    let dataPost = values || {};
    dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };

    return dispatch => {
        dispatch(_QUICK_SEARCHing_ANTIFACT());
        fetch(`${AppConfig.GET_ANTIFACTLIST}?${helper.getQueryString(dataPost)}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_ANTIFACTError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    if (responseJson.data) {
                        data = _buildListANTIFACT(responseJson.data);
                        dispatch(_QUICK_SEARCH_ANTIFACT(data, dataPost));
                    } else {
                        dispatch(_seach_ANTIFACTError());
                    }
                }
                else {
                    dispatch(_seach_ANTIFACTError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_ANTIFACTError());
            });
    };
}
function _QUICK_SEARCH_ANTIFACT(data, valuesForm) {
    return {
        type: types.QUICK_SEARCH_ANTIFACT,
        data: data,
        isLoading: false,
        valuesForm: valuesForm
    };
}

function _QUICK_SEARCHing_ANTIFACT() {
    return {
        type: types.QUICK_SEARCHING_ANTIFACT,
        isLoading: true
    };
}

function _seach_ANTIFACTError() {
    return {
        type: types.QUICK_SEARCH_ANTIFACT_ERROR,
        searchErorr: true,
        isLoading: false
    };
}