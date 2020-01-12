import React from 'react'
import { juliusRoutes } from '@constants/routes'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LOGIN_ROUTE_PATH } from './constants/routeUrls'
import '@styles/views/app.scss'

const Julius = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to={LOGIN_ROUTE_PATH} />
      </Route>
      {juliusRoutes.map((route, i) => (
        <Route exact key={i} {...route} />
      ))}
    </Switch>
  )
}

export default Julius
