import {
  USER_SIGNUP_START,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_FAILURE
} from "@constants/actionTypes";
import { callUserSignupApi, callUserLoginpApi } from "@utils/apis/login.api.js";

const userSignupStartAction = () => ({
  type: USER_SIGNUP_START
});
const userSignupSuccessAction = userData => ({
  type: USER_SIGNUP_SUCCESS,
  payload: userData
});

const userSignupFailureAction = errData => ({
  type: USER_SIGNUP_FAILURE,
  payload: errData
});

export const userSignupAsyncAction = payload => {
  return dispatch => {
    dispatch(userSignupStartAction());
    callUserSignupApi(payload)
      .then(res => {
        dispatch(userSignupSuccessAction(res.data));
      })
      .catch(err => {
        dispatch(userSignupFailureAction(err));
      });
  };
};
const userLoginStartAction = () => ({
  type: USER_LOGIN_START
});
const userLoginSuccessAction = userData => ({
  type: USER_LOGIN_SUCCESS,
  payload: userData
});

const userLoginFailureAction = errData => ({
  type: USER_LOGIN_FAILURE,
  payload: errData
});

export const userLoginAsyncAction = payload => {
  return dispatch => {
    dispatch(userLoginStartAction());
    return callUserLoginpApi(payload)
      .then(res => {
        dispatch(userLoginSuccessAction(res.data));
        return res;
      })
      .catch(err => {
        dispatch(userLoginFailureAction(err));
        throw err;
      });
  };
};
