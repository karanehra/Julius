import {
  SET_APP_LOADED_FAILURE,
  SET_APP_LOADING,
  OPEN_SNACKBAR_ACTION
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

/**
 * Redux action
 * Controls the global snackbar
 * @param {Object} payload The snackbar info payload
 * @param {string} payload.type The snackbar type. SUCCESS,INFO,ERROR,WARN
 * @param {string} payload.message The snackbar message
 * @param {boolean} payload.isOpen The snackbar state
 */
export const openSnackbarAction = payload => ({
  type: OPEN_SNACKBAR_ACTION,
  payload
})
