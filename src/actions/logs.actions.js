import {
  GET_LOGS_DATA_START,
  GET_LOGS_DATA_SUCCESS,
  GET_LOGS_DATA_FAILURE
} from "../constants/actionTypes";
import { callGetLogsApi } from "@utils/apis/apiService";

const getLogsStartAction = () => ({
  type: GET_LOGS_DATA_START
});

const getLogsSuccessAction = data => ({
  type: GET_LOGS_DATA_SUCCESS,
  payload: data
});
const getLogsFailureAction = err => ({
  type: GET_LOGS_DATA_FAILURE,
  payload: err
});

export const getLogsAsyncAction = payload => {
  return dispatch => {
    dispatch(getLogsStartAction());
    callGetLogsApi(payload)
      .then(res => {
        dispatch(getLogsSuccessAction(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(getLogsFailureAction(err));
      });
  };
};
