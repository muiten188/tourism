import * as types from "../../constants/action_types";
const initState = {
  isLoading: false,
  listMuseum: [],
  listArea: [],
  searchErorr: false,
  searchAreaErorr: false,
  valuesForm: {},
  currentPage: 1,
  pageSize: 10,
  loadEnd: false
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SEARCH_MUSEUM:
      return {
        ...state,
        listMuseum: action.data,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchErorr: initState.searchErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.SEARCHING_MUSEUM:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_MUSEUM_ERROR:
      return {
        ...state,
        searchErorr: action.searchErorr,
      };
    case types.SEARCH_MUSEUM_CLEAR_ERROR:
      return {
        ...state,
        searchErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };

    case types.SEARCH_AREA:
      return {
        ...state,
        listArea: action.data,
        isLoading: action.isLoading,
        currentPage: initState.currentPage,
        searchAreaErorr: initState.searchAreaErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.SEARCHING_AREA:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SEARCH_AREA_ERROR:
      return {
        ...state,
        searchAreaErorr: action.searchAreaErorr,
      };
    case types.SEARCH_AREA_CLEAR_ERROR:
      return {
        ...state,
        searchAreaErorr: initState.searchErorr,
        isLoading: initState.isLoading
      };
    default:
      return state;
  }
}
