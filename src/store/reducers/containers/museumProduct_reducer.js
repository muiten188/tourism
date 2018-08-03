import * as types from "../../constants/action_types";
const initState = {
  isLoading: true,
  antifactDetail: {},
  listAntifactByTag: [],
  searchAntifactDetailErorr: false,
  searchAntifactBytagErorr: false,
  valuesForm: {},
  currentPage: 1,
  pageSize: 10,
  loadEnd: false
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_ANTIFACT_DETAIL:
      return {
        ...state,
        antifactDetail: action.data,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchAntifactDetailErorr: initState.searchErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.SEARCHING_ANTIFACT_DETAIL:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_ANTIFACT_DETAIL_ERROR:
      return {
        ...state,
        searchAntifactDetailErorr: action.searchErorr,
      };
    case types.SEARCH_ANTIFACT_DETAIL_CLEAR_ERROR:
      return {
        ...state,
        searchAntifactDetailErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    //antifact by tag
    case types.SEARCH_ANTIFACT_BY_TAG:
      return {
        ...state,
        listAntifactByTag: action.data,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchAntifactBytagErorr: initState.searchErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.SEARCHING_ANTIFACT_BY_TAG:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_ANTIFACT_BY_TAG_ERROR:
      return {
        ...state,
        searchAntifactBytagErorr: action.searchErorr,
      };
    case types.SEARCH_ANTIFACT_BY_TAG_CLEAR_ERROR:
      return {
        ...state,
        searchAntifactBytagErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };


    default:
      return state;
  }
}
