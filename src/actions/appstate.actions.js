import {
  SET_APP_LOADED_FAILURE,
  SET_APP_LOADING
} from '../constants/actionTypes'

/**
 * Redux action
 * Set's global app loading state
 * @param {boolean} payload Whether app is loading or not
 */
export const setAppLoadingAction = payload => ({
  type: SET_APP_LOADING,
  payload
})

/**
 * Redux action
 * Set's global app loading false with error data
 * @param {object} payload Error data
 */
export const setAppLoadedErrorAction = payload => ({
  type: SET_APP_LOADED_FAILURE,
  payload
})
