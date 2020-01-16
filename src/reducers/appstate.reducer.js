import {
  SET_APP_LOADED_FAILURE,
  SET_APP_LOADING,
  OPEN_SNACKBAR_ACTION
} from '../constants/actionTypes'

const initialState = {
  loading: false,
  error: null,
  errorMessage: null,
  isSnackbarOpen: false
}

export default function appstateReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_APP_LOADING:
      return {
        ...state,
        loading: payload
      }
    case SET_APP_LOADED_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case OPEN_SNACKBAR_ACTION:
      return {
        ...state,
        isSnackbarOpen: payload.isOpen,
        snackbarMessage: payload.message,
        snackbarType: payload.type
      }
    default:
      return state
  }
}
