import {
  USER_SIGNUP_START,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE
} from "../constants/actionTypes";
const initialState = {
  signupData: null,
  loading: false,
  errorData: null
};

export default function usersReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_SIGNUP_START:
      return { ...state, loading: true };
    case USER_SIGNUP_SUCCESS:
      return { ...state, loading: false, signupData: payload, errorData: null };
    case USER_SIGNUP_FAILURE:
      return { ...state, loading: false, errorData: payload, signupata: null };
    default:
      return state;
  }
}