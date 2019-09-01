import {
  GET_DASHBOARD_DATA_START,
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_DATA_FAILURE
} from "../constants/actionTypes";
const initialState = {
  loading: false,
  dashboardData: null,
  errorData: null
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_DATA_START:
      return {
        ...state,
        loading: true
      };
    case GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        errorData: null,
        dashboardData: action.payload
      };
    case GET_DASHBOARD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        errorData: action.payload,
        dashboardData: null
      };
    default:
      return state;
  }
}
