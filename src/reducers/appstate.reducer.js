import {
  SET_APP_LOADED_FAILURE,
  SET_APP_LOADING
} from '../constants/actionTypes'

const initialState = {
  loading: false,
  error: null,
  errorMessage: null
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
    default:
      return state
  }
}
