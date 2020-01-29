import React, { useEffect } from 'react'
import {
  callGetProcessDataApi,
  callPostProcessApi
} from '../../../../utils/apis/apiService'
import { Paper, Button, TextField, Typography } from '@material-ui/core'

const CronPage = () => {
  const [jobs, setJobs] = React.useState([])
  const [newJob, setNewJob] = React.useState({
    processName: '',
    type: ''
  })
  useEffect(() => {
    getProcessData()
  }, [])

  const getProcessData = async () => {
    let res = await callGetProcessDataApi()
    if (res.status === 200) {
      setJobs(res.data || [])
    }
  }

  const handleInput = event => {
    const { name, value } = event.target
    setNewJob({ ...newJob, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      let res = await callPostProcessApi(newJob)
      if (res.status === 201) {
        getProcessData()
        setNewJob({ processName: '', type: '' })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <React.Fragment>
      <Paper>
        <Typography variant='h4'>
          Add Job
          <TextField
            label='name'
            name='processName'
            value={newJob.processName}
            onChange={handleInput}
          />
          <TextField
            label='type'
            name='type'
            value={newJob.type}
            onChange={handleInput}
          />
          <Button onClick={handleSubmit}>Add</Button>
        </Typography>
      </Paper>
      {jobs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, i) => (
              <tr key={i}>
                <td>{job.name}</td>
                <td>{job.status}</td>
                <td>{job.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No data available</div>
      )}
    </React.Fragment>
  )
}

export default CronPage
