import {
  USER_SIGNUP_START,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_FAILURE
} from '@constants/actionTypes'
import { callUserSignupApi, callUserLoginpApi } from '@utils/apis/login.api.js'
import store from '../store/'
import {
  setAppLoadingAction,
  setAppLoadedErrorAction
} from './appstate.actions'

import history from '@utils/history'

const userSignupStartAction = () => ({
  type: USER_SIGNUP_START
})
const userSignupSuccessAction = userData => ({
  type: USER_SIGNUP_SUCCESS,
  payload: userData
})

const userSignupFailureAction = errData => ({
  type: USER_SIGNUP_FAILURE,
  payload: errData
})

export const userSignupAsyncAction = payload => {
  return dispatch => {
    dispatch(userSignupStartAction())
    callUserSignupApi(payload)
      .then(res => {
        dispatch(userSignupSuccessAction(res.data))
      })
      .catch(err => {
        dispatch(userSignupFailureAction(err))
      })
  }
}
const userLoginSuccessAction = userData => ({
  type: USER_LOGIN_SUCCESS,
  payload: userData
})

const userLoginFailureAction = errData => ({
  type: USER_LOGIN_FAILURE,
  payload: errData
})


export const userLoginNewAction = async ({ email, password }) => {
  store.dispatch(setAppLoadingAction(true))
  try {
    let res = await callUserLoginpApi({ email, password })
    if (res.status === 200) {
      history.push('/dashboard/')
      store.dispatch(userLoginSuccessAction(res.data))
    }
    store.dispatch(setAppLoadingAction(false))
  } catch (e) {
    store.dispatch(userLoginFailureAction(e))
    store.dispatch(setAppLoadedErrorAction(e))
  }
}
