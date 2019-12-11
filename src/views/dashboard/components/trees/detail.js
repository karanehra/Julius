import React, { Component } from "react";
import { callGetTreeByIdApi } from "../../../../utils/apis/apiService";

class TreeDetailPage extends Component {
  state = {};
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    callGetTreeByIdApi(id).then(res => {
      console.log(res);
    });
  }
  render() {
    return <React.Fragment>DEtails</React.Fragment>;
  }
}

export default TreeDetailPage;
