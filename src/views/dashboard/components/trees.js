import React, { Component } from "react";
import { callGetUserTreesApi } from "../../../utils/apis/apiService";
import { connect } from "react-redux";

class TreesPage extends Component {
  state = {};
  componentDidMount() {
    const { userID } = this.props;
    callGetUserTreesApi(userID).then(res => {
      console.log(res);
    });
  }
  render() {
    return <React.Fragment>Hello</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  userID: state.usersReducer.userData._id
});

export default connect(mapStateToProps)(TreesPage);
