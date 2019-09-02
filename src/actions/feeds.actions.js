import { callGetFeedsApi } from "../utils/apiService";
import {
  GET_FEED_DATA_SUCCESS,
  GET_FEED_DATA_START,
  GET_DASHBOARD_DATA_FAILURE
} from "../constants/actionTypes";
const getFeedDataStartAction = () => ({
  type: GET_FEED_DATA_START
});

const getFeedDataSuccessAction = data => ({
  type: GET_FEED_DATA_SUCCESS,
  payload: data
});

const getFeedDataFailureAction = err => ({
  type: GET_DASHBOARD_DATA_FAILURE,
  payload: err
});

export const getFeedDataAsyncAction = payload => {
  return dispatch => {
    dispatch(getFeedDataStartAction());
    callGetFeedsApi()
      .then(res => {
        console.log(res.data);
        dispatch(getFeedDataSuccessAction(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(getFeedDataFailureAction(err));
      });
  };
};
