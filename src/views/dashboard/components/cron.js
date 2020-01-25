import React, { useEffect } from 'react'
import { callGetProcessDataApi } from '../../../utils/apis/apiService'

const CronPage = () => {
  const [jobs, setJobs] = React.useState([])
  useEffect(() => {
    async function getData() {
      let res = await callGetProcessDataApi()
      if (res.status === 200) {
        setJobs(res.data)
      }
    }
    getData()
  }, [])
  return <div>Hello, {jobs.length}</div>
}

export default CronPage
