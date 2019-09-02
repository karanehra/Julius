import {
  GET_ARTICLE_DATA_SUCCESS,
  GET_ARTICLE_DATA_START,
  GET_ARTICLE_DATA_FAILURE
} from "../constants/actionTypes";
const initialState = {
  loading: false,
  articleData: null,
  errorData: null
};

export default function articlesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLE_DATA_START:
      return {
        ...state,
        loading: true
      };
    case GET_ARTICLE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        articleData: action.payload,
        errorData: null
      };
    case GET_ARTICLE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        articleData: null,
        errorData: action.payload
      };
    default:
      return state;
  }
}
