import React from 'react'
import {
  Typography,
  Button,
  Paper,
  TextField,
  Grid,
  InputAdornment
} from '@material-ui/core'
import Cancel from '@material-ui/icons/Cancel'
import Link from '@material-ui/icons/Link'
import { connect } from 'react-redux'
import { callPurgeFeedsApi } from '@utils/apis/apiService'

const FeedToolbar = props => {
  const { isMobile } = props
  const [feedAddPanelVisible, switchFeedPanel] = React.useState(false)

  const purgeFeeds = async () => {
    let res = await callPurgeFeedsApi()
    if (res.status === 200) {
      this.componentDidMount()
    }
  }

  const addFeed = async () => {
    try {
      let res = await callAddFeedApi({
        URL: this.state.addingFeedUrl.split(';'),
        title: 'Some title'
      })
      if (res.status === 201) {
        this.componentDidMount()
      }
    } catch {
      console.log('Error occured')
    }
  }

  return (
    <React.Fragment>
      <div className='actions'>
        <Button
          color='primary'
          variant='contained'
          onClick={() => switchFeedPanel(true)}
        >
          {feedAddPanelVisible ? <Cancel /> : 'Add Feed'}
        </Button>
        &nbsp;
        <Button color='primary' variant='contained' onClick={purgeFeeds}>
          Purge Feeds
        </Button>
      </div>
      {feedAddPanelVisible && (
        <Paper className='add-feed-cont'>
          <Grid container spacing={2}>
            <Grid item xs={isMobile ? 12 : 2} className='add-text'>
              <Typography variant='h6'>Add New Feed</Typography>
            </Grid>

            <Grid item xs={isMobile ? 12 : 8}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Link />
                    </InputAdornment>
                  )
                }}
                fullWidth
                variant='outlined'
                label='Add RSS url'
                onChange={this.handleInput}
                name='addingFeedUrl'
              />
            </Grid>
            <Grid item xs={2} className='add-text'>
              <Button
                fullWidth
                color='primary'
                size='large'
                variant='outlined'
                onClick={addFeed}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  isMobile: state.deviceReducer.isMobile
})

export default connect(mapStateToProps)(FeedToolbar)
