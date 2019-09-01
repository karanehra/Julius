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
import Loader from "./shared/loader";
import { isAppLoading } from "../utils/helpers";
import { connect } from "react-redux";

class Julius extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="julius">
        <AppBar position="fixed" className="navbar">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Dashboard
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
            <Typography variant="h6" noWrap>
              Julius
            </Typography>
          </Toolbar>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <ControlCamera />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </Drawer>
        <div className="content">
          {loading && <Loader />}
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: isAppLoading(state)
});

export default connect(mapStateToProps)(Julius);
