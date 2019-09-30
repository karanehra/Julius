import React, { Component } from "react";
import { connect } from "react-redux";
import { getCronDataAsyncAction } from "@actions/cron.actions";
import {
  CardContent,
  Grid,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Stop from "@material-ui/icons/Stop";
import "@styles/views/cron.scss";
import { styled } from "@material-ui/styles";
import { callStopCronApi, callStartCronApi } from "@utils/apis/apiService";

class CronPage extends Component {
  state = {};
  componentDidMount() {
    this.refreshData();
    console.log(this.props);
  }
  refreshData = () => {
    this.props.dispatch(getCronDataAsyncAction());
  };

  startButton = styled(PlayArrow)({
    color: "green",
    cursor: "pointer"
  });
  stopButton = styled(Stop)({
    color: "red",
    cursor: "pointer"
  });
  startInactiveButton = styled(PlayArrow)({
    color: "#00800024"
  });
  stopInactiveButton = styled(Stop)({
    color: "#ff00001a"
  });

  stopCronService = id => () => {
    callStopCronApi(id)
      .then(res => {
        if (res.status === 200) {
          this.refreshData();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  startCronService = id => () => {
    callStartCronApi(id)
      .then(res => {
        if (res.status === 200) {
          this.refreshData();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { cronData, isMobile } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.refreshData}
            >
              Refresh
            </Button>
          </Grid>
          {cronData && (
            <React.Fragment>
              <Grid item xs={isMobile ? 12 : 4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Status</Typography>
                    <Typography variant="h2">
                      {cronData.filter(cron => cron.isRunning).length} Running
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={isMobile ? 12 : 4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Total Jobs</Typography>
                    <Typography variant="h2">{cronData.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cronData &&
                      cronData.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            <Typography variant="h6">{row.name}</Typography>
                          </TableCell>
                          <TableCell>
                            {row.isRunning ? (
                              <div className="green">RUNNING</div>
                            ) : (
                              <div className="red">STOPPED</div>
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {row.isRunning ? (
                              <this.startInactiveButton />
                            ) : (
                              <this.startButton
                                onClick={this.startCronService(row.id)}
                              />
                            )}
                            {row.isRunning ? (
                              <this.stopButton
                                onClick={this.stopCronService(row.id)}
                              />
                            ) : (
                              <this.stopInactiveButton />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cronData: state.cronReducer.cronData,
  errorData: state.cronReducer.errorData,
  isMobile: state.deviceReducer.isMobile
});

export default connect(mapStateToProps)(CronPage);
