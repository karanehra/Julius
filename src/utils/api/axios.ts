import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { LOGIN_PAGE_ROUTE } from '../../constants/routerUrls'
import { AppStore } from '../../store'
import history from '../history'
import { decryptIncomingResponse, encryptOutgoingRequest } from '@utils/crypto'
import { setAppLoadingAction } from '@actions/'

const instance = Axios.create({ baseURL: process.env.API_ENDPOINT })

const outgoingRequestInterceptor = (request: AxiosRequestConfig) => {
  AppStore.dispatch(setAppLoadingAction(true))
  const { user } = AppStore.state
  if (user.token) {
    request.headers = {
      Authorization: `Bearer ${user.token}`
    }
  }
  if (request.data) request = encryptOutgoingRequest(request)
  return request
}

const incomingResponseErrorInterceptor = (error: AxiosError) => {
  AppStore.dispatch(setAppLoadingAction(false))
  const res = decryptIncomingResponse(error.response)
  if (res.status === 401) {
    history.push(LOGIN_PAGE_ROUTE)
  }
  return error
}

instance.interceptors.request.use(outgoingRequestInterceptor, error => error)
instance.interceptors.response.use(decryptIncomingResponse, incomingResponseErrorInterceptor)

export default instance
