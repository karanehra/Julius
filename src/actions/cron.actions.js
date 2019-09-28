import {  callGetCronDataApi } from "@utils/apis/apiService";
import {
  GET_CRON_DATA_START,
  GET_CRON_DATA_SUCCESS,
  GET_CRON_DATA_FAILURE
} from "../constants/actionTypes";

const getCronDataStartAction = () => ({
  type: GET_CRON_DATA_START
});

const getCronDataSuccessAction = data => ({
  type: GET_CRON_DATA_SUCCESS,
  payload: data
});

const getCronDataFailureAction = err => ({
  type: GET_CRON_DATA_FAILURE,
  payload: err
});

export const getCronDataAsyncAction = () => {
  return dispatch => {
    dispatch(getCronDataStartAction());
    callGetCronDataApi().then(res => {
        console.log(res.data);
        dispatch(getCronDataSuccessAction(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(getCronDataFailureAction(err));
      });
  };
};
