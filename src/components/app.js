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

class Julius extends Component {
  state = {};
  render() {
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
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Julius;
