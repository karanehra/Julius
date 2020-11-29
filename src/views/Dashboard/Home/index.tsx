import React, { FunctionComponent, useState } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import './index.scss'
import { callPostRssFeedUrlsApi } from '@utils/api/job'
import { useStore } from '@store'
import { setSnackbarDataAction } from '@actions'

const DashboardHomeView: FunctionComponent = () => {
  const [urlString, setUrlString] = useState<string>('')

  const { dispatch } = useStore()

  const submitRssFeedUrls = async () => {
    const { status } = await callPostRssFeedUrlsApi(urlString)
    if (status === 200) {
      dispatch(setSnackbarDataAction({ message: 'URLs Submitted', type: 'SUCCESS' }))
      setUrlString('')
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>Dashboard</h1>
      </Grid>
      <Grid item xs={12}>
        <h3>Add Feeds</h3>
      </Grid>
      <Grid item xs={10}>
        <TextField
          fullWidth
          size='small'
          label='Enter URLs seperated by ;'
          value={urlString}
          onChange={e => setUrlString(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button fullWidth onClick={submitRssFeedUrls}>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

export default DashboardHomeView
