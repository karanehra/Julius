import React, { FC } from 'react'
import { Link, Switch } from 'react-router-dom'
import { AppBar, Grid, Paper } from '@material-ui/core'
import PrivateRoute from '@shared/PrivateRoute'
import { DASHBOARD_HOME_PAGE_ROUTE, DASHBOARD_JOBS_PAGE_ROUTE } from '@constants/routerUrls'
import DashboardHomeView from './Home'
import DashboardJobsView from './Jobs'
import './index.scss'
import history from '@utils/history'

const DashboardView: FC = () => {
  const getLinkClass = (url: string) => {
    const isActive = url === history.location.pathname
    return isActive ? 'link active' : 'link'
  }

  return (
    <>
      <AppBar className='navbar'>
        <div className='brand'>Julius</div>
      </AppBar>
      <Grid container className='content'>
        <Grid item xs={3}>
          <Paper className='sidenav'>
            <Link
              className={getLinkClass(DASHBOARD_HOME_PAGE_ROUTE)}
              to={DASHBOARD_HOME_PAGE_ROUTE}
            >
              Home
            </Link>
            <Link
              className={getLinkClass(DASHBOARD_JOBS_PAGE_ROUTE)}
              to={DASHBOARD_JOBS_PAGE_ROUTE}
            >
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
