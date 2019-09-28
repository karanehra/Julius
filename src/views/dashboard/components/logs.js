import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import { getLogsAsyncAction } from "../../../actions/logs.actions";
import { callClearLogsApi } from "../../../utils/apiService";

class LogsPage extends Component {
  componentDidMount() {
    this.getLogData();
  }
  clearLogs = () => {
    callClearLogsApi().then(res => {
      if (res.status === 200) {
        this.getLogData();
      }
    });
  };

  getLogData = () => {
    this.props.dispatch(getLogsAsyncAction());
  };

  render() {
    const { logsData } = this.props;
    return (
      <React.Fragment>
        <Button color="secondary" variant="contained" onClick={this.getLogData}>
          Refresh
        </Button>
        &nbsp;
        <Button color="primary" variant="contained" onClick={this.clearLogs}>
          Clear Logs
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logsData &&
              logsData.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.log_type}</TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  logsData: state.logsReducer.logsData
});

export default connect(mapStateToProps)(LogsPage);
