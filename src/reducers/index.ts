import { SET_APP_LOADING_ACTION, USER_LOGIN_SUCCESS_ACTION } from '@constants/actionTypes'

export default function RootReducer(state, action) {
  const { type, payload } = action
  let newState
  switch (type) {
    case USER_LOGIN_SUCCESS_ACTION:
      newState = { ...state, user: payload }
      break
    case SET_APP_LOADING_ACTION:
      newState = { ...state, isAppLoading: payload }
      break
    default:
      newState = state
      break
  }
  localStorage.setItem('JULIUS_STORE', JSON.stringify(newState))
  return newState
}
