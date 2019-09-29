import {
  GET_DASHBOARD_DATA_START,
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_DATA_FAILURE,
  DASHBOARD_LAYOUT_CHANGE,
  DASHBOARD_LAYOUT_CHANGE_MOBILE
} from "../constants/actionTypes";
const initialState = {
  loading: false,
  dashboardData: null,
  errorData: null,
  layout: [
    { w: 2, h: 3, x: 0, y: 0 },
    { w: 2, h: 3, x: 2, y: 0 },
    { w: 3, h: 4, x: 4, y: 0 },
    { w: 3, h: 4, x: 7, y: 0 }
  ],
  layoutMobile: [
    { w: 6, h: 3, x: 0, y: 0 },
    { w: 6, h: 3, x: 6, y: 0 },
    { w: 12, h: 5, x: 0, y: 3 },
    { w: 12, h: 5, x: 0, y: 8 }
  ]
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
    case DASHBOARD_LAYOUT_CHANGE:
      return {
        ...state,
        layout: action.payload
      };
    case DASHBOARD_LAYOUT_CHANGE_MOBILE:
      return {
        ...state,
        layoutMobile: action.payload
      };
    default:
      return state;
  }
}
