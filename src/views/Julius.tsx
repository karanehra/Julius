import React, { FunctionComponent } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import LoginView from './Login/index'
import DashboardView from './Dashboard/'
import { LOGIN_PAGE_ROUTE, DASHBOARD_PAGE_ROUTE } from '@constants/routerUrls'
import history from '@utils/history'
import { StoreProvider } from '../store/index'
import PrivateRoute from '@shared/PrivateRoute'
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
