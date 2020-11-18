import React, { FunctionComponent, useState, useEffect } from 'react'
import { callGetJobsApi, callDequeueJobApi, callRequeueJobApi } from '../../../utils/api/job'

const DashboardJobsView: FunctionComponent = () => {
  const [jobsData, setoJobsData] = useState(null)

  const populateJobsData = async () => {
    const { status, data } = await callGetJobsApi()
    if (status === 200) setoJobsData(data.data)
  }

  const dequeueJob = jobId => async () => {
    const { status } = await callDequeueJobApi(jobId)
    if (status === 200) populateJobsData()
  }

  const requeueJob = jobId => async () => {
    const { status } = await callRequeueJobApi(jobId)
    if (status === 200) populateJobsData()
  }

  useEffect(() => {
    populateJobsData()
  }, [])

  return (
    <div>
      <h1>Jobs</h1>
    </div>
  )
}

export default DashboardJobsView
