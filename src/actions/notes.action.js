import {
  GET_BOARDS_START,
  GET_BOARDS_SUCCESS,
  GET_BOARDS_FAILURE
} from "../constants/actionTypes";
import { callGetUserBoardsApi } from "../utils/apis/apiService";

const getBoardsStartAction = () => ({
  type: GET_BOARDS_START
});
const getBoardsSuccessAction = boardsData => ({
  type: GET_BOARDS_SUCCESS,
  payload: boardsData
});

const getBoardsFailureAction = errorData => ({
  type: GET_BOARDS_FAILURE,
  payload: errorData
});

export const getUserBoardsDataAsync = userId => {
  return dispatch => {
    dispatch(getBoardsStartAction());
    callGetUserBoardsApi(userId)
      .then(res => {
        dispatch(getBoardsSuccessAction(res.data));
        return res.data;
      })
      .catch(e => {
        dispatch(getBoardsFailureAction(e));
        throw e;
      });
  };
};
