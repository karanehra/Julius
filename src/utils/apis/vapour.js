import Axios from 'axios'

const VAPOUR_BASE_URL = 'http://localhost:3009'

/**
 * Calls the status check API
 */
export const callGetVapourStatusApi = () => {
  return Axios.get(`${VAPOUR_BASE_URL}/status`)
}
