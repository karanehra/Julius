import React, { Component } from "react";
import { connect } from "react-redux";
import { getDashboardDataAsyncAction } from "../actions/dashboard.actions";
class Dashboard extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(getDashboardDataAsyncAction());
  }
  render() {
    const { dashboardReducer: dashData } = this.props;
    return (
      <React.Fragment>
        {dashData.dashboardData ? <div>Data</div> : <div>No data</div>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(Dashboard);
