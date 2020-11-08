import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from '../constants/actionTypes'
const initialState = {
  signupData: null,
  loading: false,
  userData: null,
  errorData: null,
  token: null
}

export default function usersReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: payload.user,
        token: payload.token,
        errorData: null
      }
    case USER_LOGIN_FAILURE:
      return { ...state, loading: false, errorData: payload, userData: null }
    default:
      return state
  }
}
