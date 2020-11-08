import {
  DASHBOARD_LAYOUT_CHANGE,
  DASHBOARD_LAYOUT_CHANGE_MOBILE
} from "@constants/actionTypes";


export const dashboardLayoutChangeAction = layout =>({
  type: DASHBOARD_LAYOUT_CHANGE,
  payload: layout
})

export const dashboardLayoutChangeMobileAction = layout => ({
  type: DASHBOARD_LAYOUT_CHANGE_MOBILE,
  payload: layout
})