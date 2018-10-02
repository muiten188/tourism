import { AsyncStorage } from "react-native";
import { Keyboard } from "react-native";
import * as types from "../../store/constants/action_types";
import * as AppConfig from "../../config/app_config";
import { Actions } from 'react-native-router-flux';

function getQueryString(params) {
  return Object.keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
          .join("&");
      }

      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join("&");
}

export function forgotPassword(objForgot) {
  debugger;
  return dispatch => {
    dispatch(_forgotingPassword());
    let error = false;
    fetch(`${AppConfig.FORGOT_PASSWORD}?${getQueryString(objForgot)}`, {
      method: "GET",
    })
      .then(function (response) {
        
        if (response.status != 200) {
          dispatch(_forgotPassword(false));
          error = true;
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        if (responseJson) {
          var oUser = responseJson;
          dispatch(_forgotPassword(true, oUser));

        }
        else {
          if (!error) {
            dispatch(_forgotPassword(false));
          }
        }
      })
      .catch(function (error) {
        dispatch(_forgotPassword(false));
      });
  };
}

export function _forgotingPassword() {
  return {
    type: types.FORGOTING_PASSWORD,
    Loging: true
  };
}

export function _forgotPassword(status, user) {
  if (status) {
    return {
      type: types.FORGOT_PASSWORD,
      user: user,
      Logged: status
    };
  } else {
    return {
      type: types.FORGOT_PASSWORD_ERROR,
      Logged: status
    };
  }
}

export function clearForgotPasswordError(){
  return {
    type: types.CLEAR_FORGOT_PASSWORD_ERROR,
  };
}