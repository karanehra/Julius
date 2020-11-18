import React, { FC } from 'react'
import { AppBar, Grid, Paper } from '@material-ui/core'
import './index.scss'
import PrivateRoute from '../../shared/PrivateRoute'
import { DASHBOARD_HOME_PAGE_ROUTE, DASHBOARD_JOBS_PAGE_ROUTE } from '../../constants/routerUrls'
import DashboardHomeView from './Home'
import DashboardJobsView from './Jobs'
import { Switch } from 'react-router'

const DashboardView: FC = () => {
  return (
    <>
      <AppBar className='navbar'>Hello</AppBar>
      <Grid container className='content'>
        <Grid item xs={3}>
          <Paper className='sidenav'>dadsd</Paper>
        </Grid>
        <Grid item xs={9}>
          <Switch>
            <PrivateRoute exact path={DASHBOARD_HOME_PAGE_ROUTE} component={DashboardHomeView} />
            <PrivateRoute exact path={DASHBOARD_JOBS_PAGE_ROUTE} component={DashboardJobsView} />
          </Switch>
        </Grid>
      </Grid>
    </>
  )
}

export default DashboardView
