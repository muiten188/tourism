import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  listAntifact: [{},{},{},{}],
  searchErorr: false,
  valuesForm: {},
  loadEnd: false
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.QUICK_SEARCH_ANTIFACT:
      return {
        ...state,
        listAntifact: action.data,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchErorr: initState.searchErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.QUICK_SEARCHING_ANTIFACT:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.QUICK_SEARCH_ANTIFACT_ERROR:
      return {
        ...state,
        searchErorr: action.searchErorr,
      };
    case types.QUICK_SEARCH_ANTIFACT_CLEAR_ERROR:
      return {
        ...state,
        searchErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    default:
      return state;
  }
}
