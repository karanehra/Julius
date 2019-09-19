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
import { Switch, Route } from "react-router-dom";
import "@styles/app.scss";
import Dashboard from "./dashboard";
import ControlCamera from "@material-ui/icons/ControlCamera";
import RssFeed from "@material-ui/icons/RssFeed";
import ListIcon from "@material-ui/icons/List";
import SelectAll from "@material-ui/icons/SelectAll";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Info from "@material-ui/icons/Info";
import Timer from "@material-ui/icons/Timer";
import Loader from "./shared/loader";
import { isAppLoading } from "../utils/helpers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FeedsPage from "./feeds";
import ArticlesPage from "./articles";
import CronPage from "./cron";
import LogsPage from "./logs";
import { deviceDetectAcion } from "../actions/device.actions";
import { isMobile } from "react-device-detect";

class Julius extends Component {
  state = {
    isMobileDrawerOpen: false
  };

  componentDidMount() {
    this.props.dispatch(deviceDetectAcion(isMobile));
  }

  routeTo = route => event => {
    this.setState({isMobileDrawerOpen:false})
    this.props.history.push(route);
  };

  getHeader = () => {
    switch (this.props.location.pathname) {
      case "/articles":
        return "Articles";
      case "/":
        return "Dashboard";
      case "/feeds":
        return "Feeds";
      case "/cronjobs":
        return "Cron Jobs";
      case "/logs":
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
        className={this.getActiveClass("/")}
        onClick={this.routeTo("/")}
      >
        <ListItemIcon classes={{ root: "white" }}>
          <ControlCamera />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        className={this.getActiveClass("/feeds")}
        onClick={this.routeTo("/feeds")}
      >
        <ListItemIcon classes={{ root: "white" }}>
          <RssFeed />
        </ListItemIcon>
        <ListItemText primary="Feeds" />
      </ListItem>
      <ListItem
        button
        className={this.getActiveClass("/articles")}
        onClick={this.routeTo("/articles")}
      >
        <ListItemIcon classes={{ root: "white" }}>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Articles" />
      </ListItem>
      <ListItem
        button
        className={this.getActiveClass("/cronjobs")}
        onClick={this.routeTo("/cronjobs")}
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
        className={this.getActiveClass("/logs")}
        onClick={this.routeTo("/logs")}
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
        <AppBar position="fixed" className={isMobile ? "navbar mb" : "navbar"}>
          <Toolbar className="navbar-toolbar">
            {isMobile ? (
              <React.Fragment>
                <div className="menu" onClick={this.toggleMobileDrawer}>
                  <ListIcon/>
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
          {loading && <Loader />}
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/feeds" component={FeedsPage} />
            <Route exact path="/articles" component={ArticlesPage} />
            <Route exact path="/cronjobs" component={CronPage} />
            <Route exact path="/logs" component={LogsPage} />
          </Switch>
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
