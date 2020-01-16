import React, { useEffect } from 'react'
import { juliusRoutes } from '@constants/routes'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LOGIN_ROUTE_PATH } from './constants/routeUrls'
import { Snackbar } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import '@styles/views/app.scss'
import { setAppLoadingAction } from './actions/appstate.actions'

const Julius = () => {
  const { isSnackbarOpen } = useSelector(
    state => ({
      isSnackbarOpen: state.appstateReducer.isSnackbarOpen
    }),
    ({ isSnackbarOpenOld }, { isSnackbarOpenNew }) =>
      {console.log(isSnackbarOpenOld)
        return isSnackbarOpenNew !== isSnackbarOpenOld;}
  )
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(setAppLoadingAction(false))
    // console.log('helllo')
  })
  return (
    <React.Fragment>
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
