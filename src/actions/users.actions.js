import {
  USER_SIGNUP_START,
  USER_SIGNUP_SUCCESS
} from "../constants/actionTypes";
import { callUserSignupApi } from "../utils/apiService";

const userSignupStartAction = () => ({
  type: USER_SIGNUP_START
});
const userSignupSuccessAction = userData => ({
  type: USER_SIGNUP_SUCCESS,
  payload: userData
});

const userSignupFailureAction = errData => ({
  type: USER_SIGNUP_SUCCESS,
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
