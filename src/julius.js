import React, { Component } from "react";
import { juliusRoutes } from "@constants/routes";
import { Switch, Route, Redirect } from "react-router-dom";
import "@styles/views/app.scss";
import { LOGIN_ROUTE_PATH } from "./constants/routeUrls";

class Julius extends Component {
  state = {};
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Redirect to={LOGIN_ROUTE_PATH} />
        </Route>
        {juliusRoutes.map((route, i) => (
          <Route exact key={i} path={route.path} component={route.component} />
        ))}
      </Switch>
    );
  }
}

export default Julius;
