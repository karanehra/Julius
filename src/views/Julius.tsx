import * as React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import LoginView from './Login/index'
import history from '../utils/history'

const Julius: React.SFC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={'/'} component={LoginView} />
      </Switch>
    </Router>
  )
}

export default Julius
