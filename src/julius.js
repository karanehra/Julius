import React from 'react'
import { juliusRoutes } from '@constants/routes'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LOGIN_ROUTE_PATH } from './constants/routeUrls'
import { Snackbar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import '@styles/views/app.scss'
import { openSnackbarAction } from './actions/appstate.actions'
import { useDispatch } from 'react-redux'

const Julius = () => {
  const dispatch = useDispatch()
  const { isSnackbarOpen, snackbarMessage, snackbarType } = useSelector(
    state => ({
      isSnackbarOpen: state.appstateReducer.isSnackbarOpen,
      snackbarMessage: state.appstateReducer.snackbarMessage,
      snackbarType: state.appstateReducer.snackbarType
    })
  )

  const getSnackbarClass = () => {
    switch (snackbarType) {
      case 'INFO':
        return 'snackbar info'
      case 'SUCCESS':
        return 'snackbar success'
      case 'ERROR':
        return 'snackbar error'
    }
  }

  const closeSnackbar = () => {
    dispatch(openSnackbarAction({ isOpen: false }))
  }

  return (
    <React.Fragment>
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={snackbarMessage}
        onClose={closeSnackbar}
        autoHideDuration={2000}
      />
      <Switch>
        <Route exact path='/'>
          <Redirect to={LOGIN_ROUTE_PATH} />
        </Route>
        {juliusRoutes.map((route, i) => (
          <Route exact key={i} {...route} />
        ))}
      </Switch>
    </React.Fragment>
  )
}

export default Julius
