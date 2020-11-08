import React from 'react'
import { Paper } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import { LOGIN_ROUTE_PATH, SIGNUP_ROUTE_PATH } from '@constants/routeUrls'
import LoginPage from './login'
import SignupPage from './signup'
import './auth.scss'

const Auth = () => {
  return (
    <div className="auth-wrapper">
      <div className="side-banner">Hello</div>
      <div className="box-wrapper">
        <Paper className="box">
          <Switch>
            <Route exact path={LOGIN_ROUTE_PATH} component={LoginPage} />
            <Route exact path={SIGNUP_ROUTE_PATH} component={SignupPage} />
          </Switch>
        </Paper>
      </div>
    </div>
  )
}

export default Auth
