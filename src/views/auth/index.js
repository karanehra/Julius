import React from 'react'
import './auth.scss'
import { Switch, Route } from 'react-router-dom'
import { LOGIN_ROUTE_PATH, SIGNUP_ROUTE_PATH } from '@constants/routeUrls'
import LoginPage from './login'
import SignupPage from './signup'

const Auth = () => {
  return (
    <div className="auth-wrapper">
      <div className="side-banner">Hello</div>
      <div className="box-wrapper">
        <Switch>
          <Route exact path={LOGIN_ROUTE_PATH} component={LoginPage} />
          <Route exact path={SIGNUP_ROUTE_PATH} component={SignupPage} />
        </Switch>
      </div>
    </div>
  )
}

export default Auth
