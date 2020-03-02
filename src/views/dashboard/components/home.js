import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  dashboardLayoutChangeAction,
  dashboardLayoutChangeMobileAction
} from '@actions/dashboard.actions'
import { Typography, Button, Paper } from '@material-ui/core'
import GridLayout from 'react-grid-layout'
import '../../../../node_modules/react-grid-layout/css/styles.css'
import '../../../../node_modules/react-resizable/css/styles.css'
import { callGetStatusDataApi } from '@utils/apis/apiService'

class Home extends Component {
  state = {}

  componentDidMount() {
    this.refreshData()
  }

  refreshData = async () => {
    try {
      let res = await callGetStatusDataApi()
      this.setState({ ...res.data })
    } catch (e) {
      console.log(e)
    }
  }

  handleLayoutChange = layout => {
    const { isMobile, dispatch } = this.props
    isMobile
      ? dispatch(dashboardLayoutChangeMobileAction(layout))
      : dispatch(dashboardLayoutChangeAction(layout))
  }

  render() {
    const { dashboardData, isMobile, layout, layoutMobile } = this.props
    const { articleCount, feedCount } = this.state
    return (
      <React.Fragment>
        <Button variant='contained' color='primary' onClick={this.refreshData}>
          Refresh
        </Button>
        {dashboardData && (
          <GridLayout
            className='layout'
            layout={isMobile ? layoutMobile : layout}
            cols={12}
            rowHeight={30}
            width={isMobile ? window.innerWidth - 20 : window.innerWidth - 240}
            onLayoutChange={this.handleLayoutChange}
          >
            <Paper className='datacard' key='a'>
              <Typography variant='h5'>Articles</Typography>
              <Typography variant='h2'>
                {articleCount ? articleCount : 'Fetching'}
              </Typography>
            </Paper>
            <Paper className='datacard' key='b'>
              <Typography variant='h5'>Feeds</Typography>
              <Typography variant='h2'>
                {feedCount ? feedCount : 'Fetching'}
              </Typography>
            </Paper>
            {/* <Paper className='datacard' key='c'>
              {graphData && (
                <CustomChart
                  type={'bar'}
                  label={'Articles Added'}
                  data={graphData.addedDaily}
                  splice={7}
                />
              )}
            </Paper>
            <Paper className='datacard' key='d'>
              {graphData && (
                <CustomChart
                  type={'line'}
                  label={'Total Articles'}
                  data={graphData.dailyCount}
                />
              )}
            </Paper> */}
          </GridLayout>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  dashboardData: state.dashboardReducer.dashboardData,
  errorData: state.dashboardReducer.errorData,
  isMobile: state.deviceReducer.isMobile,
  layout: state.dashboardReducer.layout,
  layoutMobile: state.dashboardReducer.layoutMobile
})

export default connect(mapStateToProps)(Home)
