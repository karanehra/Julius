import Axios, { AxiosRequestConfig } from 'axios'
import { LOGIN_PAGE_ROUTE } from '../../constants/routerUrls'
import { AppStore } from '../../store'
import history from '../history'
import crypto from 'crypto'

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

const incomingResponseInterceptor = response => {
  let key = process.env.AES_KEY
  let iv = response.data.iv
  let decipher = crypto.createDecipheriv('aes-256-ctr', key, iv)
  let decrypted = decipher.update(response.data.data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  response.data = JSON.parse(decrypted)
  return response
}

instance.interceptors.request.use(outgoingRequestInterceptor, error => error)
instance.interceptors.response.use(incomingResponseInterceptor, incomingResponseErrorInterceptor)

export default instance
