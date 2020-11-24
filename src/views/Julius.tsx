import React, { FunctionComponent } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { createMuiTheme, Snackbar, ThemeProvider } from '@material-ui/core'
import LoginView from './Login/index'
import DashboardView from './Dashboard/'
import { LOGIN_PAGE_ROUTE, DASHBOARD_PAGE_ROUTE } from '@constants/routerUrls'
import history from '@utils/history'
import { StoreProvider, useStore } from '@store'
import PrivateRoute from '@shared/PrivateRoute'
import colors from './styles.scss'
import { setSnackbarDataAction } from '@actions'

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

const Main: FunctionComponent = () => {
  const {
    store: { snackbarData: { message, type } = {} as any },
    dispatch
  } = useStore()

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={!!message}
        autoHideDuration={60000}
        onClose={() => dispatch(setSnackbarDataAction({ message: '', type: 'INFO' }))}
        message={message}
        classes={{ root: `snackbar-${type}` }}
      />

      <Router history={history}>
        <Switch>
          <Route exact path={LOGIN_PAGE_ROUTE} component={LoginView} />
          <PrivateRoute exact path={DASHBOARD_PAGE_ROUTE} component={DashboardView} />
        </Switch>
      </Router>
    </>
  )
}

const Julius: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <Main />
      </StoreProvider>
    </ThemeProvider>
  )
}

export default Julius
