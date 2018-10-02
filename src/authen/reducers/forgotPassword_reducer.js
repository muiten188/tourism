import * as types from "../../store/constants/action_types";
const initState = {
  isLoading: false,
  forgotPasswordSuccess: false,
  forgotPasswordError: false
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.FORGOT_PASSWORD:
      return {
        ...state,
        isLoading: false,
        forgotPasswordSuccess: true,
        forgotPasswordError: false
      };
    case types.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        forgotPasswordSuccess: false,
        forgotPasswordError: true
      };
    case types.FORGOTING_PASSWORD:
      return {
        ...state,
        isLoading: true,
        forgotPasswordSuccess: false,
        forgotPasswordError: false
      };
    case types.CLEAR_FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: initState.isLoading,
        forgotPasswordSuccess: initState.forgotPasswordSuccess,
        forgotPasswordError: initState.forgotPasswordError
      };
    default:
      return state;
  }
}
