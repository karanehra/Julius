import * as React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import LoginView from './Login/index'
import history from '../utils/history'
import DashboardView from './Dashboard/index'
import { LOGIN_PAGE_ROUTE, DASHBOARD_PAGE_ROUTE } from '../constants/routerUrls'
import { StoreProvider } from '../store'
import PrivateRoute from '../shared/PrivateRoute'

const Julius: React.SFC = () => {
  return (
    <StoreProvider>
      <Router history={history}>
        <Switch>
          <Route exact path={LOGIN_PAGE_ROUTE} component={LoginView} />
          <PrivateRoute exact path={DASHBOARD_PAGE_ROUTE} component={DashboardView} />
        </Switch>
      </Router>
    </StoreProvider>
  )
}

export default Julius
