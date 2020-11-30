import React, { FunctionComponent, useState } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import './index.scss'
import { callPostRssFeedUrlsApi } from '@utils/api/job'
import { useStore } from '@store'
import { setSnackbarDataAction } from '@actions'
import { isURLValid } from '@utils/helpers'

const DashboardHomeView: FunctionComponent = () => {
  const [urlString, setUrlString] = useState<string>('')
  const [urlStringError, setUrlStringError] = useState<boolean>(false)

  const { dispatch } = useStore()

  const isUrlStringValid = () => {
    const urls = urlString.split(';')
    return urls.every(val => isURLValid(val))
  }

  const submitRssFeedUrls = async () => {
    if (isUrlStringValid()) {
      const { status } = await callPostRssFeedUrlsApi(urlString)
      if (status === 200) {
        dispatch(setSnackbarDataAction({ message: 'URLs Submitted', type: 'SUCCESS' }))
        setUrlString('')
      }
    } else {
      setUrlStringError(true)
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
          error={urlStringError}
          helperText={urlStringError ? 'String Contains an Invalid URL' : ''}
          size='small'
          label='Enter URLs seperated by ;'
          value={urlString}
          onChange={e => {
            setUrlString(e.target.value)
            setUrlStringError(false)
          }}
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
