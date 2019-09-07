import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow
} from "@material-ui/core";
import { connect } from "react-redux";
import { getLogsAsyncAction } from '../actions/logs.actions';

class LogsPage extends Component {
  componentWillMount() {
    this.props.dispatch(getLogsAsyncAction());
  }
  state = {
    data: []
  };

  render() {
    const { logsData } = this.props;
    return (
      <React.Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Snippet</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {logsData &&
              logsData.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.snippet}</TableCell>
                  <TableCell align="right">
                    <a href={row.link}>Visit</a>
                  </TableCell>
                </TableRow>
              ))} */}
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
