import {
  GET_ARTICLE_DATA_START,
  GET_ARTICLE_DATA_SUCCESS,
  GET_ARTICLE_DATA_FAILURE
} from "../constants/actionTypes";
import { callGetArticlesApi } from "@utils/apis/apiService";

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

/**
 * Redux Action.
 * Dispatches the get article data action
 * @param {number} payload.page The page number of results
 * @param {number} payload.pageSize The number of results on each page
 * @param {number} payload.query The query string for articles
 */
export const getArticleDataAsyncAction = payload => {
  return dispatch => {
    dispatch(getArticleDataStartAction());
    callGetArticlesApi(payload)
      .then(res => {
        dispatch(getArticleDataSuccessAction(res.data.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(getArticleDataFailureAction(err));
      });
  };
};
