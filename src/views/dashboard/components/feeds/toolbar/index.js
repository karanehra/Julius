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

const FeedToolbar = props => {
  return (
    <React.Fragment>
      <div className='actions'>
        <Button
          color='secondary'
          variant='contained'
          onClick={this.getFeedData}
        >
          Refresh
        </Button>
        &nbsp;
        <Button
          color='primary'
          variant='contained'
          onClick={this.switchAddFeed}
        >
          {feedAddPanelVisible ? <Cancel /> : 'Add Feed'}
        </Button>
        &nbsp;
        <Button color='primary' variant='contained' onClick={this.purgeFeeds}>
          Purge Feeds
        </Button>
      </div>
      {feedAddPanelVisible && (
        <Paper className='add-feed-cont'>
          <Grid container spacing={2}>
            <Grid item xs={isMobile ? 12 : 2} className='add-text'>
              <Typography variant='h6'>Add New Feed</Typography>
            </Grid>

            {addFeedData ? (
              <Grid item xs={10} className='add-text'>
                Added Feed
              </Grid>
            ) : (
              <React.Fragment>
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
                    onClick={this.addFeed}
                  >
                    Add
                  </Button>
                </Grid>
              </React.Fragment>
            )}
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
