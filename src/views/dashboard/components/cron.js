import React, { useEffect } from 'react'
import { callGetProcessDataApi } from '../../../utils/apis/apiService'
import { Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core/'
import { Button } from '@material-ui/core'

const CronPage = () => {
  const [jobs, setJobs] = React.useState([])
  const [newJob, setNewJob] = React.useState({
    name: '',
    type: ''
  })
  useEffect(() => {
    async function getData() {
      let res = await callGetProcessDataApi()
      if (res.status === 200) {
        setJobs(res.data || [])
      }
    }
    getData()
  }, [])

  const handleInput = event => {
    const { name, value } = event.target
    setNewJob({ ...newJob, [name]: value })
  }

  const handleSubmit = () => {
    console.log(newJob)
  }

  return (
    <React.Fragment>
      <Paper>
        <Typography variant='h4'>
          Add Job
          <TextField
            label='name'
            name='jobName'
            value={newJob.name}
            onChange={handleInput}
          />
          <TextField
            label='type'
            name='newJobType'
            value={newJob.type}
            onChange={handleInput}
          />
          <Button onClick={handleSubmit}></Button>
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
