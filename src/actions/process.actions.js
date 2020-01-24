import { GET_PROCESS_SUCCESS } from '../constants/actionTypes'
import store from '../store/index'
import { setAppLoadingAction } from './appstate.actions'
import { callGetProcessDataApi } from '../utils/apis/apiService'

const getProcessSuccessAction = payload => ({
  type: GET_PROCESS_SUCCESS,
  payload
})

export const getProcessAction = async () => {
  store.dispatch(setAppLoadingAction(true))
  try {
    let res = await callGetProcessDataApi()
    if (res.status === 200) {
      store.dispatch(getProcessSuccessAction(res.data))
      return res
    }
  } finally {
    store.dispatch(setAppLoadingAction(false))
  }
}
