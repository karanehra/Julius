import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import '@styles/views/feeds.scss'
import { callUpdateFeedByIDApi } from '@utils/apis/apiService'
import FeedCard from './feedCard'
import { callGetFeedsApi } from '@utils/apis/apiService'

class FeedsPage extends Component {
  state = {
    expandedPanel: null,
    feedAddPanelVisible: false,
    addingFeedUrl: null,
    tagstring: '',
    feedData: []
  }

  async componentDidMount() {
    let res = await callGetFeedsApi()
    if (res.status === 200) {
      this.setState({ feedData: res.data })
    }
  }

  switchAddFeed = () => {
    this.setState({ feedAddPanelVisible: !this.state.feedAddPanelVisible })
  }

  handleInput = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  updateFeed = feedData => async () => {
    const { tagstring } = this.state
    const { _id } = feedData
    const tags = tagstring.split(',')
    feedData.tags = tags
    let res = await callUpdateFeedByIDApi(_id, feedData)
    if (res) {
      console.log(res)
    }
  }

  render() {
    const { feedData } = this.state
    return (
      <React.Fragment>
        {feedData && feedData.length > 0 ? (
          <Grid container>
            {feedData.map((feed, i) => (
              <Grid key={i} item xs={4}>
                <FeedCard data={feed} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div className='no-feeds'>No Feeds Available</div>
        )}
      </React.Fragment>
    )
  }
}

export default FeedsPage
