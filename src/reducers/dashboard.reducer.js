import {
  DASHBOARD_LAYOUT_CHANGE,
  DASHBOARD_LAYOUT_CHANGE_MOBILE
} from "../constants/actionTypes";
const initialState = {
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
