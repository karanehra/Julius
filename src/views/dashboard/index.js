import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import "@styles/views/app.scss";
import ControlCamera from "@material-ui/icons/ControlCamera";
import RssFeed from "@material-ui/icons/RssFeed";
import ListIcon from "@material-ui/icons/List";
import SelectAll from "@material-ui/icons/SelectAll";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Info from "@material-ui/icons/Info";
import Timer from "@material-ui/icons/Timer";
import Loader from "@shared/loader";
import { isAppLoading } from "@utils/helpers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deviceDetectAcion } from "@actions/device.actions";
import { isMobile } from "react-device-detect";
import {
  FEEDS_ROUTE_PATH,
  ARTICLES_ROUTE_PATH,
  CRONJOBS_ROUTE_PATH,
  LOGS_ROUTE_PATH
} from "@constants/routeUrls";
import { juliusDashboardRoutes } from "@constants/routes";
import { LOGIN_ROUTE_PATH, HOME_ROUTE_PATH } from "../../constants/routeUrls";
import GenericText from "../../shared/genericText";

class Dashboard extends Component {
  state = {
    isMobileDrawerOpen: false,
    isProfileDrawerOpen: false
  };

  componentDidMount() {
    const { userData, history } = this.props;
    if (!userData) {
      history.push(LOGIN_ROUTE_PATH);
    } else {
      this.props.dispatch(deviceDetectAcion(isMobile));
    }
  }

  routeTo = route => () => {
    this.setState({ isMobileDrawerOpen: false });
    this.props.history.push(route);
  };

  getHeader = () => {
    switch (this.props.location.pathname) {
      case ARTICLES_ROUTE_PATH:
        return "Articles";
      case HOME_ROUTE_PATH:
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

  toggleProfileDrawer = () => {
    this.setState({
      isProfileDrawerOpen: !this.state.isProfileDrawerOpen
    });
  };

  logout = () => {
    this.props.history.push(LOGIN_ROUTE_PATH);
    localStorage.clear();
  };

  getNavigationMarkup = () => (
    <List component="nav">
      <ListItem
        button
        className={this.getActiveClass("/dashboard/home")}
        onClick={this.routeTo("/dashboard/home")}
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
    const { isMobileDrawerOpen, isProfileDrawerOpen } = this.state;
    const { loading, isMobile, userData } = this.props;
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
              <div className="toolbar-cont">
                <Typography variant="h6" noWrap>
                  {this.getHeader()}
                </Typography>
                <div className="left">
                  <Typography variant="h6" noWrap>
                    Hello, {userData.firstName}
                  </Typography>
                  <div onClick={this.toggleProfileDrawer} className="dp"></div>
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {!isMobile && (
          <Drawer
            open={isProfileDrawerOpen}
            onClose={this.toggleProfileDrawer}
            anchor="right"
          >
            <div className="profile-drawer">
              <GenericText size={34} gutters={5} bold>
                {userData.firstName + " " + userData.lastName}
              </GenericText>
              <GenericText gutters={15} size={14}>
                {userData.email}
              </GenericText>
              <Button onClick={this.logout} color="primary" variant="contained">
                Logout
              </Button>
            </div>
          </Drawer>
        )}
        {isMobile ? (
          <Drawer open={isMobileDrawerOpen} onClose={this.toggleMobileDrawer}>
            <div className="mb-drawer-profile">
              {userData.firstName + " " + userData.lastName}
            </div>
            {this.getNavigationMarkup()}
            <Button onClick={this.logout} color="primary" variant="contained">
              Logout
            </Button>
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
            {juliusDashboardRoutes.map((route, i) => (
              <Route
                exact
                key={i}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: isAppLoading(state),
  isMobile: state.deviceReducer.isMobile,
  userData: state.usersReducer.userData
});

export default withRouter(connect(mapStateToProps)(Dashboard));
