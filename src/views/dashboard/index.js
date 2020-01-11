import React, { Component } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Button
} from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import '@styles/views/app.scss'
import ListIcon from '@material-ui/icons/List'
import SelectAll from '@material-ui/icons/SelectAll'
import Loader from '@shared/loader'
import { isAppLoading } from '@utils/helpers'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { deviceDetectAcion } from '@actions/device.actions'
import { isMobile } from 'react-device-detect'
import {
  FEEDS_ROUTE_PATH,
  ARTICLES_ROUTE_PATH,
  CRONJOBS_ROUTE_PATH,
  LOGS_ROUTE_PATH,
  LOGIN_ROUTE_PATH,
  HOME_ROUTE_PATH,
} from '@constants/routeUrls'
import { juliusDashboardRoutes } from '@constants/routes'
import GenericText from '../../shared/genericText'
import Sidenav from './sidenav'

class Dashboard extends Component {
  state = {
    isMobileDrawerOpen: false,
    isProfileDrawerOpen: false
  }

  componentDidMount() {
    const { userData, history } = this.props
    if (!userData) {
      history.push(LOGIN_ROUTE_PATH)
    } else {
      this.props.dispatch(deviceDetectAcion(isMobile))
    }
  }

  getHeader = () => {
    switch (this.props.location.pathname) {
      case ARTICLES_ROUTE_PATH:
        return 'Articles'
      case HOME_ROUTE_PATH:
        return 'Dashboard'
      case FEEDS_ROUTE_PATH:
        return 'Feeds'
      case CRONJOBS_ROUTE_PATH:
        return 'Cron Jobs'
      case LOGS_ROUTE_PATH:
        return 'Logs'
    }
  }

  toggleMobileDrawer = () => {
    this.setState({
      isMobileDrawerOpen: !this.state.isMobileDrawerOpen
    })
  }

  toggleProfileDrawer = () => {
    this.setState({
      isProfileDrawerOpen: !this.state.isProfileDrawerOpen
    })
  }

  logout = () => {
    this.props.history.push(LOGIN_ROUTE_PATH)
    localStorage.clear()
  }

  render() {
    const { isMobileDrawerOpen, isProfileDrawerOpen } = this.state
    const { loading, isMobile, userData } = this.props
    return (
      <div className={isMobile ? 'julius mb' : 'julius'}>
        <AppBar
          color='primary'
          position='fixed'
          className={isMobile ? 'navbar mb' : 'navbar'}
        >
          <Toolbar color='primary' className='navbar-toolbar'>
            {isMobile ? (
              <React.Fragment>
                <div className='menu' onClick={this.toggleMobileDrawer}>
                  <ListIcon />
                </div>
                <SelectAll />
                <Typography className='brand' variant='h5' noWrap>
                  Julius
                </Typography>
              </React.Fragment>
            ) : (
              <div className='toolbar-cont'>
                <Typography variant='h6' noWrap>
                  {this.getHeader()}
                </Typography>
                <div className='left'>
                  <Typography variant='h6' noWrap>
                    Hello, {userData.firstName}
                  </Typography>
                  <div onClick={this.toggleProfileDrawer} className='dp'></div>
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {!isMobile && (
          <Drawer
            open={isProfileDrawerOpen}
            onClose={this.toggleProfileDrawer}
            anchor='right'
          >
            <div className='profile-drawer'>
              <GenericText size={34} gutters={5} bold>
                {userData.firstName + ' ' + userData.lastName}
              </GenericText>
              <GenericText gutters={15} size={14}>
                {userData.email}
              </GenericText>
              <Button onClick={this.logout} color='primary' variant='contained'>
                Logout
              </Button>
            </div>
          </Drawer>
        )}
        {isMobile ? (
          <Drawer open={isMobileDrawerOpen} onClose={this.toggleMobileDrawer}>
            <div className='mb-drawer-profile'>
              {userData.firstName + ' ' + userData.lastName}
            </div>
            <Sidenav />
            <Button onClick={this.logout} color='primary' variant='contained'>
              Logout
            </Button>
          </Drawer>
        ) : (
          <Drawer
            variant='permanent'
            anchor='left'
            classes={{
              paper: 'sidenav'
            }}
          >
            <Toolbar className='topbar'>
              <SelectAll />
              <Typography className='brand' variant='h5' noWrap>
                Julius
              </Typography>
            </Toolbar>
            <Sidenav />
          </Drawer>
        )}
        <div className={isMobile ? 'content mb' : 'content'}>
          {loading && <Loader />}
          <Switch>
            {juliusDashboardRoutes.map((route, i) => (
              <Route
                exact
                key={i}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: isAppLoading(state),
  isMobile: state.deviceReducer.isMobile,
  userData: state.usersReducer.userData
})

export default withRouter(connect(mapStateToProps)(Dashboard))
