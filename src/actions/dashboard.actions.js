import { callGetStatusDataApi } from "@utils/apis/apiService";
import {
  GET_DASHBOARD_DATA_START,
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_DATA_FAILURE,
  DASHBOARD_LAYOUT_CHANGE,
  DASHBOARD_LAYOUT_CHANGE_MOBILE
} from "@constants/actionTypes";

const getDashboardDataStartAction = () => ({
  type: GET_DASHBOARD_DATA_START
});

const getDashboardDataSuccessAction = data => ({
  type: GET_DASHBOARD_DATA_SUCCESS,
  payload: data
});

const getDashboardDataFailureAction = err => ({
  type: GET_DASHBOARD_DATA_FAILURE,
  payload: err
});

export const getDashboardDataAsyncAction = () => {
  return dispatch => {
    dispatch(getDashboardDataStartAction());
    callGetStatusDataApi().then(res => {
        console.log(res.data);
        dispatch(getDashboardDataSuccessAction(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(getDashboardDataFailureAction(err));
      });
  };
};

export const dashboardLayoutChangeAction = layout =>({
  type: DASHBOARD_LAYOUT_CHANGE,
  payload: layout
})

export const dashboardLayoutChangeMobileAction = layout => ({
  type: DASHBOARD_LAYOUT_CHANGE_MOBILE,
  payload: layout
})