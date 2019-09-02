import {
  GET_FEED_DATA_SUCCESS,
  GET_FEED_DATA_START,
  GET_FEED_DATA_FAILURE,
  ADD_FEED_START,
  ADD_FEED_SUCCESS,
  ADD_FEED_FAILURE
} from "../constants/actionTypes";
const initialState = {
  loading: false,
  feedData: null,
  errorData: null,
  addLoading:false,
  addFeedData:null,
  addFeedError:null
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
    case ADD_FEED_START:
      return {
        ...state,
        addLoading: true,
        addFeedData: null,
        addFeedError: null
      };
    case ADD_FEED_SUCCESS:
      return {
        ...state,
        addLoading: true,
        addFeedData: action.payload,
        addFeedError: null
      };
    
    case ADD_FEED_FAILURE:
      return {
        ...state,
        addLoading: true,
        addFeedData: null,
        addFeedError: action.payload
      };
    default:
      return state;
  }
}
