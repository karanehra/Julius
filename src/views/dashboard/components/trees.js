import React, { Component } from "react";
import { callGetUserTreesApi } from "../../../utils/apis/apiService";
import { connect } from "react-redux";

let effectiveHeight = window.innerHeight - 104;
let effectiveWidth = window.innerWidth - 280;

window.onresize = () => {
  effectiveHeight = window.innerHeight - 104;
  effectiveWidth = window.innerWidth - 280;
};

class TreesPage extends Component {
  state = {
    tree: null
  };

  componentDidMount() {
    const { userID } = this.props;
    callGetUserTreesApi(userID).then(res => {
      console.log(res);
      this.setState({ tree: res.data[0] });
    });
  }

  render() {
    const { tree } = this.state;
    return (
      <React.Fragment>
        {!tree ? (
          <div>Hello</div>
        ) : (
          <svg width={effectiveWidth} height={effectiveHeight}>
            <g>
              <circle
                cx={effectiveWidth / 2}
                cy={effectiveHeight / 2}
                r="100"
                stroke="red"
                strokeWidth="3"
                fill="none"
              />
              <text
                x={effectiveWidth / 2}
                y={effectiveHeight / 2}
                textAnchor="middle"
                stroke="red"
                strokeWidth="1px"
              >
                {tree.title}
              </text>
            </g>
          </svg>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.usersReducer.userData._id
});

export default connect(mapStateToProps)(TreesPage);
