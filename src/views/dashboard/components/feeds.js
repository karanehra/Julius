import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFeedDataAsyncAction } from '@actions/feeds.actions'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Button,
  Paper,
  TextField,
  Grid,
  InputAdornment
} from '@material-ui/core'
import Cancel from '@material-ui/icons/Cancel'
import Link from '@material-ui/icons/Link'
import ExpandMore from '@material-ui/icons/ExpandMore'
import GenericText from '@shared/genericText'
import '@styles/views/feeds.scss'
import {
  callAddFeedApi,
  callPurgeFeedsApi,
  callUpdateFeedByIDApi
} from '../../../utils/apis/apiService'

class FeedsPage extends Component {
  state = {
    expandedPanel: null,
    feedAddPanelVisible: false,
    addingFeedUrl: null,
    tagstring: ''
  }

  componentDidMount() {
    this.getFeedData()
  }

  expandPanel = event => {
    this.setState({ expandedPanel: event.target.id })
  }

  getFeedData = () => {
    this.props.dispatch(getFeedDataAsyncAction())
  }

  switchAddFeed = () => {
    this.setState({ feedAddPanelVisible: !this.state.feedAddPanelVisible })
  }

  handleInput = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  addFeed = async () => {
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

  purgeFeeds = async () => {
    let res = await callPurgeFeedsApi()
    if (res.status === 200) {
      this.componentDidMount()
    }
  }

  updateFeed = feedData => async () => {
    const { tagstring } = this.state
    console.log(tagstring)
    const { _id } = feedData
    let res = await callUpdateFeedByIDApi(_id, feedData)
    if (res) {
      console.log(res)
    }
  }

  render() {
    const { feedData, addFeedData, isMobile } = this.props
    const { expandedPanel, feedAddPanelVisible, tagstring } = this.state
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
        {feedData && feedData.length > 0 ? (
          feedData.map((feed, i) => (
            <ExpansionPanel key={i} expanded={expandedPanel === 'panel-' + i}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls={'panel-' + i + '-content'}
                id={'panel-' + i}
                onClick={this.expandPanel}
              >
                <Typography>{feed.title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='feed-details'>
                <div>
                  <GenericText size={14} bold>
                    Id:
                  </GenericText>
                  <GenericText size={12}>{feed.id}</GenericText>
                </div>
                <div>
                  <GenericText size={14} bold>
                    Description:
                  </GenericText>
                  <GenericText size={12}>{feed.description}</GenericText>
                </div>
                <div>
                  <GenericText size={14} bold>
                    Created At:
                  </GenericText>
                  <GenericText size={12}>{feed.createdAt}</GenericText>
                </div>
                <div>
                  <GenericText size={14} bold>
                    Tags:
                  </GenericText>
                  <GenericText size={12}>{feed.tags}</GenericText>
                </div>
                <TextField
                  name='tagstring'
                  value={tagstring}
                  onChange={this.handleInput}
                />
                <Button onClick={this.updateFeed(feed)} variant='contained'>
                  {' '}
                  Update
                </Button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))
        ) : (
          <div className='no-feeds'>No Feeds Available</div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  feedData: state.feedsReducer.feedData,
  addLoading: state.feedsReducer.addLoading,
  addFeedData: state.feedsReducer.addFeedData,
  isMobile: state.deviceReducer.isMobile
})

export default connect(mapStateToProps)(FeedsPage)
