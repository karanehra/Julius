import {
  GET_BOARDS_START,
  GET_BOARDS_SUCCESS,
  GET_BOARDS_FAILURE
} from "../constants/actionTypes";

const initalState = {
  boardsData: null,
  errorData: null,
  loading: false
};

export default function notesReducer(state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BOARDS_START:
      return {
        ...state,
        loading: true
      };
    case GET_BOARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        errorData: null,
        boardsData: payload
      };
    case GET_BOARDS_FAILURE:
      return {
        ...state,
        loading: false,
        boardsData: null,
        errorData: payload
      };
    default:
      return state;
  }
}
