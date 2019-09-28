import React, { Component } from "react";
import juliusRoutes from './constants/routes';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

class Julius extends Component {
  state = {};
  render() {
    return (
      <Switch>
        {juliusRoutes.map((route, i) => (
          <Route exact key={i} path={route.path} component={route.component} />
        ))}
      </Switch>
    );
  }
}

export default Julius;
