import {
  GET_ARTICLE_DATA_START,
  GET_ARTICLE_DATA_SUCCESS,
  GET_ARTICLE_DATA_FAILURE
} from "../constants/actionTypes";
import { callGetArticlesApi } from "../utils/apiService";

const getArticleDataStartAction = () => ({
  type: GET_ARTICLE_DATA_START
});

const getArticleDataSuccessAction = data => ({
  type: GET_ARTICLE_DATA_SUCCESS,
  payload: data
});

const getArticleDataFailureAction = err => ({
  type: GET_ARTICLE_DATA_FAILURE,
  payload: err
});

export const getArticleDataAsyncAction = payload => {
  return dispatch => {
    dispatch(getArticleDataStartAction());
    callGetArticlesApi()
      .then(res => {
        console.log(res.data);
        dispatch(getArticleDataSuccessAction(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(getArticleDataFailureAction(err));
      });
  };
};
