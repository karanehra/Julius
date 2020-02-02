import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from '@constants/actionTypes'
import { callUserLoginpApi } from '@utils/apis/login.api.js'
import store from '../store/'
import {
  setAppLoadingAction,
  setAppLoadedErrorAction
} from './appstate.actions'

import history from '@utils/history'

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
