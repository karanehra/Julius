import {
  GET_GRAPH_DATA_START,
  GET_GRAPH_DATA_SUCCESS,
  GET_GRAPH_DATA_FAILURE
} from "../constants/actionTypes";
const initialState = {
  loading: false,
  graphData: null,
  errorData: null
};

export default function graphsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GRAPH_DATA_START:
      return {
        ...state,
        loading: true
      };
    case GET_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        errorData: null,
        graphData: action.payload
      };
    case GET_GRAPH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        errorData: action.payload,
        graphData: null
      };
    default:
      return state;
  }
}
