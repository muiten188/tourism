import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import * as helper from '../../../helper';

export function get_Area(values, currentPage, pageSize, user) {
    let data = [];
    let dataPost = values || {};
    dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    return dispatch => {
        //dispatch(_searching_Museum());
        fetch(`${AppConfig.GET_AREA}?${helper.getQueryString(dataPost)}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_AreaError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    if (responseJson.data) {
                        data = responseJson.data;
                        dispatch(_search_Area(data, dataPost));
                    } else {
                        dispatch(_seach_AreaError());
                    }
                }
                else {
                    dispatch(_seach_AreaError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_AreaError());
            });
    };
}

export function search_Museum(values, currentPage, pageSize, user) {
    let data = [];
    let dataPost = values || {};
    dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
    debugger;
    return dispatch => {
        dispatch(_searching_Museum());
        fetch(`${AppConfig.GET_MUSEUMLIST}?${helper.getQueryString(dataPost)}`, {
            headers: helper.buildHeader(user),
            method: "GET"
        })
            .then(function (response) {
                if (response.status == 401) {
                    //dispatch(_logout());
                } else if (response.status != 200) {
                    dispatch(_seach_MuseumError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson) {
                    if (responseJson.data) {
                        data = _buildListMuseum(responseJson.data);
                        dispatch(_search_Museum(data, dataPost));
                    } else {
                        dispatch(_seach_MuseumError());
                    }
                }
                else {
                    dispatch(_seach_MuseumError());
                }
            })
            .catch(function (error) {
                dispatch(_seach_MuseumError());
            });
    };
}
function _search_Museum(data, valuesForm) {
    return {
        type: types.SEARCH_MUSEUM,
        data: data,
        isLoading: false,
        valuesForm: valuesForm
    };
}

function _searching_Museum() {
    return {
        type: types.SEARCHING_MUSEUM,
        isLoading: true
    };
}

function _seach_MuseumError() {
    return {
        type: types.SEARCH_MUSEUM_ERROR,
        searchErorr: true,
        isLoading: false
    };
}

function _search_Area(data, valuesForm) {
    return {
        type: types.SEARCH_AREA,
        data: data,
        isLoading: false,
        valuesForm: valuesForm
    };
}

function _searching_Area() {
    return {
        type: types.SEARCHING_AREA,
        isLoading: true
    };
}

function _seach_AreaError() {
    return {
        type: types.SEARCH_AREA_ERROR,
        searchAreaErorr: true,
        isLoading: false
    };
}

function _buildListMuseum(data) {
    var listAreaListed = [];
    var listResult = [];
    var tempArray = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (listAreaListed.indexOf(item.area) == -1) {
            listAreaListed.push(item.area);
            var objectData = {
                area: item.area,
                data: []
            }
            for (j = i; j < data.length; j++) {
                var itemY = data[j];
                if ((objectData.data.indexOf(itemY) == -1) && itemY.area == item.area) {
                    objectData.data.push(itemY);
                }
            }
            listResult.push(objectData);
        }
    }
    return listResult;
}

export function clearMuseumError() {
    return {
        type: types.SEARCH_MUSEUM_CLEAR_ERROR
    };
}

export function clearAreaError() {
    return {
        type: types.SEARCH_AREA_CLEAR_ERROR
    };
}