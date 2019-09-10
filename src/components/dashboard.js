import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getDashboardDataAsyncAction,
  dashboardLayoutChangeAction,
  dashboardLayoutChangeMobileAction
} from "../actions/dashboard.actions";
import { Typography, Button, Paper } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { getGraphDataAsyncAction } from "../actions/graphs.actions";
import CustomChart from "./shared/lineChart";
import GridLayout from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";

class Dashboard extends Component {
  state = {};
  componentDidMount() {
    this.refreshData();
  }
  refreshData = () => {
    this.props.dispatch(getDashboardDataAsyncAction());
    this.props.dispatch(getGraphDataAsyncAction());
  };
  handleLayoutChange = layout => {
    this.props.isMobile
      ? this.props.dispatch(dashboardLayoutChangeMobileAction(layout))
      : this.props.dispatch(dashboardLayoutChangeAction(layout));
  };

  render() {
    const {
      dashboardData,
      graphData,
      isMobile,
      layout,
      layoutMobile
    } = this.props;
    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={this.refreshData}>
          Refresh
        </Button>
        {dashboardData && (
          <GridLayout
            className="layout"
            layout={isMobile ? layoutMobile : layout}
            cols={12}
            rowHeight={30}
            width={isMobile ? window.innerWidth - 20 : window.innerWidth - 240}
            onLayoutChange={this.handleLayoutChange}
          >
            <Paper className="datacard" key="a">
              <Typography variant="h5">Articles</Typography>
              <Typography variant="h2">{dashboardData.articles}</Typography>
            </Paper>
            <Paper className="datacard" key="b">
              <Typography variant="h5">Feeds</Typography>
              <Typography variant="h2">{dashboardData.feeds}</Typography>
            </Paper>
            <Paper className="datacard" key="c">
              {graphData && (
                <CustomChart
                  type={"bar"}
                  label={"Articles Added"}
                  data={graphData.addedDaily}
                  splice={7}
                />
              )}
            </Paper>
            <Paper className="datacard" key="d">
              {graphData && (
                <CustomChart
                  type={"line"}
                  label={"Total Articles"}
                  data={graphData.dailyCount}
                />
              )}
            </Paper>
          </GridLayout>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dashboardData: state.dashboardReducer.dashboardData,
  errorData: state.dashboardReducer.errorData,
  graphData: state.graphsReducer.graphData,
  isMobile: state.deviceReducer.isMobile,
  layout: state.dashboardReducer.layout,
  layoutMobile: state.dashboardReducer.layoutMobile
});

export default connect(mapStateToProps)(Dashboard);
