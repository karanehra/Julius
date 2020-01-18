import Axios from 'axios'
import { openSnackbarAction } from '../../actions/appstate.actions'
import store from '../../store'

const errorResponseHandler = err => {
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

const errorRequesrHandler = err => {
  throw err
}

Axios.interceptors.response.use(res => res, errorResponseHandler)
Axios.interceptors.request.use(req => req, errorRequesrHandler)

export default Axios
