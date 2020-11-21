import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { LOGIN_PAGE_ROUTE } from '../../constants/routerUrls'
import { AppStore } from '../../store'
import history from '../history'
import crypto from 'crypto'
import { decryptIncomingResponse, encryptOutgoingRequest } from '@utils/crypto'

const instance = Axios.create({ baseURL: 'http://localhost:9000' })

const outgoingRequestInterceptor = (request: AxiosRequestConfig) => {
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
  const res = decryptIncomingResponse(error.response)
  if (res.status === 401) {
    history.push(LOGIN_PAGE_ROUTE)
  }
  return error
}

instance.interceptors.request.use(outgoingRequestInterceptor, error => error)
instance.interceptors.response.use(decryptIncomingResponse, incomingResponseErrorInterceptor)

export default instance
