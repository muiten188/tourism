import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  changePasswordError: false,
  changePasswordSuccess:false,
  changePasswordMessage: ''
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordError: false,
        changePasswordSuccess:true,
        isLoading: false,
      };
    case types.CHANGING_PASSWORD:
      return {
        ...state,
        isLoading: true,
      };
    case types.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordError: true,
        isLoading: false
      };
    case types.CLEAR_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordError: initState.changePasswordError,
        isLoading: initState.isLoading,
        changePasswordSuccess:initState.changePasswordSuccess
      };
    default:
      return state;
  }
}
