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
import Timer from "@material-ui/icons/Timer";
import Loader from "./shared/loader";
import { isAppLoading } from "../utils/helpers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FeedsPage from "./feeds";
import ArticlesPage from "./articles";

class Julius extends Component {
  state = {
    active: null
  };

  componentDidMount() {
    console.log(this.props);
  }

  routeTo = route => event => {
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
    }
  };

  getActiveClass = link => {
    return link === this.props.location.pathname ? "active" : "";
  };

  render() {
    const { loading } = this.props;
    return (
      <div className="julius">
        <AppBar position="fixed" className="navbar">
          <Toolbar>
            <Typography variant="h6" noWrap>
              {this.getHeader()}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          anchor="left"
          classes={{
            paper: "sidenav"
          }}
        >
          <Toolbar className="topbar">
            <SelectAll />
            &nbsp;
            <Typography variant="h5" noWrap>
              Julius
            </Typography>
          </Toolbar>
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
              className={this.getActiveClass("/crons")}
              onClick={this.routeTo("/crons")}
            >
              <ListItemIcon classes={{ root: "white" }}>
                <Timer />
              </ListItemIcon>
              <ListItemText primary="Cron" />
            </ListItem>
          </List>
        </Drawer>
        <div className="content">
          {loading && <Loader />}
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/feeds" component={FeedsPage} />
            <Route exact path="/articles" component={ArticlesPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: isAppLoading(state)
});

export default withRouter(connect(mapStateToProps)(Julius));
