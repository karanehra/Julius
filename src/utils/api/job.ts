import Axios from './axios'

export const callGetJobsApi = () => {
  return Axios.get('/jobs/')
}

export const callQueueJobApi = (payload: { name: string }) => {
  return Axios.post('/jobs/enqueue', payload)
}

export const callDequeueJobApi = (jobID: string) => {
  return Axios.get(`/jobs/cancel/${jobID}`)
}

export const callRequeueJobApi = (jobID: string) => {
  return Axios.get(`/jobs/requeue/${jobID}`)
}
