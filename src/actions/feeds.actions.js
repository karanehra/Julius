import { callGetFeedsApi, callAddFeedApi } from "../utils/apiService";
import {
  GET_FEED_DATA_SUCCESS,
  GET_FEED_DATA_START,
  GET_DASHBOARD_DATA_FAILURE,
  ADD_FEED_START,
  ADD_FEED_SUCCESS,
  ADD_FEED_FAILURE
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

const addFeedStartAction = () => ({
  type: ADD_FEED_START
});

const addFeedSuccessAction = data => ({
  type: ADD_FEED_SUCCESS,
  payload: data
});

const addFeedFailureAction = err => ({
  type: ADD_FEED_FAILURE,
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

export const addFeedAsyncAction = payload => {
  return dispatch => {
    dispatch(addFeedStartAction());
    callAddFeedApi(payload)
      .then(res => {
        console.log(res.data);
        dispatch(addFeedSuccessAction(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(addFeedFailureAction(err));
      });
  };
};
