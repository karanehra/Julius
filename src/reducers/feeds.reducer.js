import {
  GET_FEED_DATA_SUCCESS,
  GET_FEED_DATA_START,
  GET_FEED_DATA_FAILURE
} from "../constants/actionTypes";
const initialState = {
  loading: false,
  feedData: null,
  errorData: null
};

export default function feedsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FEED_DATA_START:
      return {
        ...state,
        loading: true
      };
    case GET_FEED_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        feedData: action.payload,
        errorData: null
      };
    case GET_FEED_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        feedData: null,
        errorData: action.payload
      };
    default:
      return state;
  }
}
