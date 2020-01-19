import Axios from 'axios'
import { openSnackbarAction } from '../../actions/appstate.actions'
import store from '../../store'

const errorResponseInterceptor = err => {
  const { message } = err.toJSON()
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

Axios.interceptors.response.use(res => res, errorResponseInterceptor)
Axios.interceptors.request.use(successRequestInterceptor)

export default Axios
