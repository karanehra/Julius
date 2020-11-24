import React, { FC } from 'react'
import { Link, Switch } from 'react-router-dom'
import { AppBar, Grid, Paper } from '@material-ui/core'
import PrivateRoute from '@shared/PrivateRoute'
import { DASHBOARD_HOME_PAGE_ROUTE, DASHBOARD_JOBS_PAGE_ROUTE } from '@constants/routerUrls'
import DashboardHomeView from './Home'
import DashboardJobsView from './Jobs'
import './index.scss'

const DashboardView: FC = () => {
  return (
    <>
      <AppBar className='navbar'>
        <div className='brand'>Julius</div>
      </AppBar>
      <Grid container className='content'>
        <Grid item xs={3}>
          <Paper className='sidenav'>
            <Link className='link' to={DASHBOARD_HOME_PAGE_ROUTE}>
              Home
            </Link>
            <Link className='link' to={DASHBOARD_JOBS_PAGE_ROUTE}>
              Jobs
            </Link>
          </Paper>
        </Grid>
        <Grid item className='display-area' xs={9}>
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
