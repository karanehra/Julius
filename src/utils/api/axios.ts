import Axios, { AxiosRequestConfig } from 'axios'
import { LOGIN_PAGE_ROUTE } from '../../constants/routerUrls'
import { AppStore } from '../../store'
import history from '../history'

const instance = Axios.create({ baseURL: 'http://localhost:9000' })

const outgoingRequestInterceptor = (request: AxiosRequestConfig) => {
  const { user } = AppStore.state
  if (user.token) {
    request.headers = {
      Authorization: `Bearer ${user.token}`
    }
  }
  return request
}

const incomingResponseErrorInterceptor = error => {
  const { status } = error.response
  if (status === 401) {
    history.push(LOGIN_PAGE_ROUTE)
  }
  return error
}

instance.interceptors.request.use(outgoingRequestInterceptor, error => error)
instance.interceptors.response.use(response => response, incomingResponseErrorInterceptor)

export default instance
