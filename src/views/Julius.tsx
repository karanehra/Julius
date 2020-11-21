import React, { FunctionComponent } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import LoginView from './Login/index'
import history from '../utils/history'
import DashboardView from './Dashboard/index'
import { LOGIN_PAGE_ROUTE, DASHBOARD_PAGE_ROUTE } from '../constants/routerUrls'
import { StoreProvider } from '../store'
import PrivateRoute from '../shared/PrivateRoute'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import colors from './styles.scss'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primaryColorT1
    },
    secondary: {
      main: colors.secondaryColorT1
    }
  },
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary'
    },
    MuiTextField: {
      variant: 'outlined'
    }
  }
})

const Julius: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <Router history={history}>
          <Switch>
            <Route exact path={LOGIN_PAGE_ROUTE} component={LoginView} />
            <PrivateRoute exact path={DASHBOARD_PAGE_ROUTE} component={DashboardView} />
          </Switch>
        </Router>
      </StoreProvider>
    </ThemeProvider>
  )
}

export default Julius
