import React, { Component } from "react";
import { callGetUserTreesApi } from "../../../../utils/apis/apiService";
import { connect } from "react-redux";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow
} from "@material-ui/core";
import { TREES_ROUTE_PATH } from "../../../../constants/routeUrls";

class TreesListingPage extends Component {
  state = {
    treeData: null
  };

  componentDidMount() {
    const { userID } = this.props;
    callGetUserTreesApi(userID).then(res => {
      let treeData = res.data;
      this.setState({ treeData });
    });
  }

  routeToDetails = id => () => {
    const { history } = this.props;
    history.push([TREES_ROUTE_PATH, id].join("/"));
  };

  render() {
    const { treeData } = this.state;
    return (
      <React.Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {treeData &&
              treeData.map(tree => (
                <TableRow
                  key={tree._id}
                  onClick={this.routeToDetails(tree._id)}
                >
                  <TableCell component="th" scope="row">
                    {tree._id}
                  </TableCell>
                  <TableCell align="right">{tree.title}</TableCell>
                  <TableCell align="right">{tree.createdAt}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.usersReducer.userData._id
});

export default connect(mapStateToProps)(TreesListingPage);
