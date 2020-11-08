import Axios from 'axios'

const VAPOUR_BASE_URL = 'http://localhost:3009'

/**
 * Calls the status check API
 */
export const callGetVapourStatusApi = () => {
  return Axios.get(`${VAPOUR_BASE_URL}/status`)
}

/**
 * Retrieves the cache shard data and key data
 */
export const callGetVapourShardsApi = () => {
  return Axios.get(`${VAPOUR_BASE_URL}/analytics/main`)
}
