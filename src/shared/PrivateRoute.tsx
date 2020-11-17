import React, { FunctionComponent, useState } from 'react'
import { useStore } from '../store'
import { Redirect, Route, RouteProps } from 'react-router-dom'

export interface PrivateRouteProps extends RouteProps {}

/**
 * HOC for the react-router `Route`. Redirects to homepage if user is not logged in
 */
const PrivateRoute: FunctionComponent<PrivateRouteProps> = props => {
  const { exact, path, component } = props
  const { store } = useStore()
  return <>{store.user ? <Route {...{ exact, path, component }} /> : <Redirect to={'/'} />}</>
}

export default PrivateRoute
