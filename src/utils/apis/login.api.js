import Axios from 'axios'
// const API_BASE_URL = "http://api.karanehra.me";
const API_BASE_URL = 'http://localhost:3007'

Axios.interceptors.request.use(
  req => {
    return req
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  }
)

export const callUserSignupApi = payload => {
  return Axios.post(API_BASE_URL + '/users/', payload)
}

/**
 * @param {Object} payload Login payload
 * @param {string} payload.email User email
 * @param {string} payload.password Auth payload
 */
export const callUserLoginpApi = payload => {
  return Axios.post(API_BASE_URL + '/user/login', payload)
}
