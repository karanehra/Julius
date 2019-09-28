import {
  GET_GRAPH_DATA_START,
  GET_GRAPH_DATA_SUCCESS,
  GET_GRAPH_DATA_FAILURE
} from "../constants/actionTypes";
import { callGetGraphDataApi } from "@utils/apis/apiService";

const getGraphDataStartAction = () => ({
  type: GET_GRAPH_DATA_START
});

const getGraphDataSuccessAction = data => ({
  type: GET_GRAPH_DATA_SUCCESS,
  payload: data
});

const getGraphDataFailureAction = err => ({
  type: GET_GRAPH_DATA_FAILURE,
  payload: err
});
export const getGraphDataAsyncAction = payload => {
  return dispatch => {
    dispatch(getGraphDataStartAction());
    callGetGraphDataApi()
      .then(res => {
        console.log(res.data);
        dispatch(getGraphDataSuccessAction(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(getGraphDataFailureAction(err));
      });
  };
};
