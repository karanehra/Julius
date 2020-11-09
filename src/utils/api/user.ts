import Axios from './axios'
import { AuthPayload } from '../interfaces'

export const callUserSignupApi = (payload: AuthPayload) => {
  return Axios.post('/user/signup', payload)
}

export const callUserLoginpApi = (payload: AuthPayload) => {
  return Axios.post('/user/login', payload)
}
