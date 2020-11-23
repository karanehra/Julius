import { SET_APP_LOADING_ACTION, USER_LOGIN_SUCCESS_ACTION } from '../constants/actionTypes'

export const userLoginSuccessAction = payload => ({
  type: USER_LOGIN_SUCCESS_ACTION,
  payload
})

export const setAppLoadingAction = (payload: boolean) => ({
  type: SET_APP_LOADING_ACTION,
  payload
})
