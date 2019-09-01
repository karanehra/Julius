import { callGetStatusDataApi } from "../utils/apiService";
import {
  GET_DASHBOARD_DATA_START,
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_DATA_FAILURE
} from "../constants/actionTypes";

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
