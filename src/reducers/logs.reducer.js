import {
  GET_LOGS_DATA_START,
  GET_LOGS_DATA_SUCCESS,
  GET_LOGS_DATA_FAILURE
} from "../constants/actionTypes";
const initalState = {
  loading: false,
  logsData: null,
  errData: null
};

export default function logsReducer(state = initalState, action) {
  switch (action.payload) {
    case GET_LOGS_DATA_START:
      return {
        ...state,
        loading: true
      };
    case GET_LOGS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        logsData: action.payload,
        errData: null
      };
    case GET_LOGS_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        logsData: null,
        errData: action.payload
      };
    default:
      return state;
  }
}
