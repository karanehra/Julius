import * as React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import LoginView from './Login/index'
import history from '../utils/history'
import DashboardView from './Dashboard/index'
import { LOGIN_PAGE_ROUTE, DASHBOARD_PAGE_ROUTE } from '../constants/routerUrls'

const Julius: React.SFC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={LOGIN_PAGE_ROUTE} component={LoginView} />
        <Route exact path={DASHBOARD_PAGE_ROUTE} component={DashboardView} />
      </Switch>
    </Router>
  )
}

export default Julius
