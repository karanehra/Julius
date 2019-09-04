import React, { Component } from "react";
import { connect } from "react-redux";
import { getDashboardDataAsyncAction } from "../actions/dashboard.actions";
import {
  CardContent,
  CardActions,
  Grid,
  Typography,
  Button
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { getGraphDataAsyncAction } from "../actions/graphs.actions";
import LineChart from "./shared/lineChart";

class Dashboard extends Component {
  state = {};
  componentDidMount() {
    this.refreshData();
    console.log(this.props);
  }
  refreshData = () => {
    this.props.dispatch(getDashboardDataAsyncAction());
    this.props.dispatch(getGraphDataAsyncAction());
  };
  render() {
    const { dashboardData, graphData } = this.props;
    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={this.refreshData}>
          Refresh
        </Button>
        {dashboardData && (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Articles</Typography>
                  <Typography variant="h2">{dashboardData.articles}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Feeds</Typography>
                  <Typography variant="h2">{dashboardData.feeds}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Feeds</Typography>
                  {graphData && <LineChart data={graphData} />}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dashboardData: state.dashboardReducer.dashboardData,
  errorData: state.dashboardReducer.errorData,
  graphData: state.graphsReducer.graphData
});

export default connect(mapStateToProps)(Dashboard);
