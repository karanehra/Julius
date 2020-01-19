import Axios from 'axios'
import { openSnackbarAction } from '../../actions/appstate.actions'
import store from '../../store'
import history from '../history'

const errorResponseInterceptor = err => {
  const { message, code } = err.toJSON()
  if (message === 'Network Error') {
    store.dispatch(
      openSnackbarAction({
        type: 'ERROR',
        message: "Can't reach server",
        isOpen: true
      })
    )
    return
  }
  if (err.response && err.response.status === 401) {
    history.push('/user/login')
    store.dispatch(
      openSnackbarAction({
        type: 'ERROR',
        message: 'Token Expired',
        isOpen: true
      })
    )
  }
  return Promise.reject(err)
}

const successRequestInterceptor = req => {
  if (req.url) {
    if (!req.url.includes('/user')) {
      const {
        usersReducer: { token }
      } = store.getState()
      if (!!token) req.headers.Authorization = `Bearer ${token}`
      return req
    }
  }
  return req
}

const successResponseInterceptor = res => {
  return res
}

Axios.interceptors.response.use(
  successResponseInterceptor,
  errorResponseInterceptor
)
Axios.interceptors.request.use(successRequestInterceptor)

export default Axios
