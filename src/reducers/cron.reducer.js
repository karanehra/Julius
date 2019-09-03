import {
  GET_CRON_DATA_START,
  GET_CRON_DATA_SUCCESS,
  GET_CRON_DATA_FAILURE
} from "../constants/actionTypes";
const initialState = {
  loading: false,
  cronData: null,
  errorData: null
};

export default function cronReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CRON_DATA_START:
      return {
        ...state,
        loading: true
      };
    case GET_CRON_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        errorData: null,
        cronData: action.payload
      };
    case GET_CRON_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        errorData: action.payload,
        cronData: null
      };
    default:
      return state;
  }
}
