import React, { FunctionComponent, useState, useEffect, Fragment } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import {
  callGetJobsApi,
  callDequeueJobApi,
  callRequeueJobApi,
  callQueueJobApi
} from '@utils/api/job'

const DashboardJobsView: FunctionComponent = () => {
  const [jobsData, setJobsData] = useState<Array<any>>(null)
  const [newJobName, setNewJobName] = useState<string>('')

  const addNewJob = async () => {
    const { status } = await callQueueJobApi({ name: newJobName })
    if (status === 200) {
      setNewJobName('')
      populateJobsData()
    }
  }

  const populateJobsData = async () => {
    setJobsData(null)
    const { status, data } = await callGetJobsApi()
    if (status === 200) setJobsData(data.data)
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
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Jobs</h1>
        </Grid>
        <Grid item xs={8}>
          <TextField
            label='Job Name'
            value={newJobName}
            onChange={e => setNewJobName(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button disabled={!newJobName} onClick={addNewJob}>
            Add Job
          </Button>
        </Grid>
        <Grid item xs={12}>
          {jobsData ? (
            <>
              {jobsData.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Created On</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobsData.map(job => (
                      <Fragment key={job._id}>
                        <tr>
                          <td>{job.name}</td>
                          <td>{job.createdAt}</td>
                          <td>{job.status}</td>
                          <td>
                            {job.status === 'QUEUED' && (
                              <span onClick={dequeueJob(job._id)}>Dequeue</span>
                            )}
                            {job.status === 'CANCELED' && (
                              <span onClick={requeueJob(job._id)}>Requeue</span>
                            )}
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No Jobs Available</div>
              )}
            </>
          ) : (
            <div>Fetching Jobs Data</div>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default DashboardJobsView
