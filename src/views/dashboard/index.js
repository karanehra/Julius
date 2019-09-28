import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
// import { Switch, Route } from "react-router-dom";
import "@styles/app.scss";
import ControlCamera from "@material-ui/icons/ControlCamera";
import RssFeed from "@material-ui/icons/RssFeed";
import ListIcon from "@material-ui/icons/List";
import SelectAll from "@material-ui/icons/SelectAll";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Info from "@material-ui/icons/Info";
import Timer from "@material-ui/icons/Timer";
// import Loader from "./shared/loader";
import { isAppLoading } from "../../utils/helpers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deviceDetectAcion } from "@actions/device.actions";
import { isMobile } from "react-device-detect";
// import juliusRoutes from "../constants/routes";
import {
  DASHBOARD_ROUTE_PATH,
  FEEDS_ROUTE_PATH,
  ARTICLES_ROUTE_PATH,
  CRONJOBS_ROUTE_PATH,
  LOGS_ROUTE_PATH
} from "@constants/routeUrls";

class Julius extends Component {
  state = {
    isMobileDrawerOpen: false
  };

  componentDidMount() {
    this.props.dispatch(deviceDetectAcion(isMobile));
  }

  routeTo = route => event => {
    this.setState({ isMobileDrawerOpen: false });
    this.props.history.push(route);
  };

  getHeader = () => {
    switch (this.props.location.pathname) {
      case ARTICLES_ROUTE_PATH:
        return "Articles";
      case DASHBOARD_ROUTE_PATH:
        return "Dashboard";
      case FEEDS_ROUTE_PATH:
        return "Feeds";
      case CRONJOBS_ROUTE_PATH:
        return "Cron Jobs";
      case LOGS_ROUTE_PATH:
        return "Logs";
    }
  };

  getActiveClass = link => {
    return link === this.props.location.pathname ? "active" : "";
  };

  toggleMobileDrawer = () => {
    this.setState({
      isMobileDrawerOpen: !this.state.isMobileDrawerOpen
    });
  };

  getNavigationMarkup = () => (
    <List component="nav">
      <ListItem
        button
        className={this.getActiveClass(DASHBOARD_ROUTE_PATH)}
        onClick={this.routeTo(DASHBOARD_ROUTE_PATH)}
      >
        <ListItemIcon classes={{ root: "white" }}>
          <ControlCamera />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        className={this.getActiveClass(FEEDS_ROUTE_PATH)}
        onClick={this.routeTo(FEEDS_ROUTE_PATH)}
      >
        <ListItemIcon classes={{ root: "white" }}>
          <RssFeed />
        </ListItemIcon>
        <ListItemText primary="Feeds" />
      </ListItem>
      <ListItem
        button
        className={this.getActiveClass(ARTICLES_ROUTE_PATH)}
        onClick={this.routeTo(ARTICLES_ROUTE_PATH)}
      >
        <ListItemIcon classes={{ root: "white" }}>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Articles" />
      </ListItem>
      <ListItem
        button
        className={this.getActiveClass(CRONJOBS_ROUTE_PATH)}
        onClick={this.routeTo(CRONJOBS_ROUTE_PATH)}
      >
        <ListItemIcon classes={{ root: "white" }}>
          <Timer />
        </ListItemIcon>
        <ListItemText primary="Cron" />
      </ListItem>
      <ListItem
        button
        className={this.getActiveClass("/dumps")}
        onClick={this.routeTo("/dumps")}
      >
        <ListItemIcon classes={{ root: "white" }}>
          <CloudDownload />
        </ListItemIcon>
        <ListItemText primary="Dumps" />
      </ListItem>
      <ListItem
        button
        className={this.getActiveClass(LOGS_ROUTE_PATH)}
        onClick={this.routeTo(LOGS_ROUTE_PATH)}
      >
        <ListItemIcon classes={{ root: "white" }}>
          <Info />
        </ListItemIcon>
        <ListItemText primary="Logs" />
      </ListItem>
    </List>
  );

  render() {
    const { isMobileDrawerOpen } = this.state;
    const { loading, isMobile } = this.props;
    return (
      <div className={isMobile ? "julius mb" : "julius"}>
        <AppBar
          color="primary"
          position="fixed"
          className={isMobile ? "navbar mb" : "navbar"}
        >
          <Toolbar color="primary" className="navbar-toolbar">
            {isMobile ? (
              <React.Fragment>
                <div className="menu" onClick={this.toggleMobileDrawer}>
                  <ListIcon />
                </div>
                <SelectAll />
                <Typography className="brand" variant="h5" noWrap>
                  Julius
                </Typography>
              </React.Fragment>
            ) : (
              <Typography variant="h6" noWrap>
                {this.getHeader()}
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        {isMobile ? (
          <Drawer open={isMobileDrawerOpen} onClose={this.toggleMobileDrawer}>
            {this.getNavigationMarkup()}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            anchor="left"
            classes={{
              paper: "sidenav"
            }}
          >
            <Toolbar className="topbar">
              <SelectAll />
              <Typography className="brand" variant="h5" noWrap>
                Julius
              </Typography>
            </Toolbar>
            {this.getNavigationMarkup()}
          </Drawer>
        )}
        <div className={isMobile ? "content mb" : "content"}>
          {/* {loading && <Loader />}
          <Switch>
            {juliusRoutes.map((route, i) => (
              <Route
                exact
                key={i}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch> */}
          asdas
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: isAppLoading(state),
  isMobile: state.deviceReducer.isMobile
});

export default withRouter(connect(mapStateToProps)(Julius));