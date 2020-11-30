import Axios from './axios'
import { AuthPayload, SignupPayload } from '../interfaces'

export const callUserSignupApi = (payload: SignupPayload) => {
  return Axios.post('/user/signup', payload)
}

export const callUserLoginpApi = (payload: AuthPayload) => {
  return Axios.post('/user/login', payload)
}

export const callUserLogoutApi = () => {
  return Axios.get('/user/logout')
}
