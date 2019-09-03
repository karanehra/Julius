import React, { Component } from "react";
import { connect } from "react-redux";
import { getCronDataAsyncAction } from "../actions/cron.actions";
import {
  CardContent,
  CardActions,
  Grid,
  Typography,
  Button
} from "@material-ui/core";
import Card from "@material-ui/core/Card";

class CronPage extends Component {
  state = {};
  componentDidMount() {
    this.refreshData();
    console.log(this.props);
  }
  refreshData = () => {
    this.props.dispatch(getCronDataAsyncAction());
  };
  render() {
    const { cronData } = this.props;
    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={this.refreshData}>
          Refresh
        </Button>
        {cronData && (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Status</Typography>
                  <Typography variant="h2">
                    {cronData.length > 0 ? "Running" : "Stopped"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary">Stop</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Active Jobs</Typography>
                  <Typography variant="h2">{cronData.length}</Typography>
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
  cronData: state.cronReducer.cronData,
  errorData: state.cronReducer.errorData
});

export default connect(mapStateToProps)(CronPage);
