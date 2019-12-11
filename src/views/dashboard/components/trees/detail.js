import React, { Component } from "react";
import { callGetTreeByIdApi } from "../../../../utils/apis/apiService";
import { TextField, Button } from "@material-ui/core/";

class TreeDetailPage extends Component {
  state = {
    treeData: null,
    representation: null,
    addNodeTitle: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    callGetTreeByIdApi(id).then(res => {
      this.setState({
        treeData: res.data,
        representation: res.data.representation
      });
    });
  }
  handleAddNode = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    console.log(this.state.addNodeTitle, id);
  };

  render() {
    const { addNodeTitle, representation } = this.state;
    return (
      <React.Fragment>
        <TextField
          variant="outlined"
          label="Add node to parent"
          value={addNodeTitle}
          name="addNodeTitle"
          onChange={this.handleChange}
        />
        <Button variant="outlined" onClick={this.handleAddNode}>
          Add
        </Button>
        {representation && (
          <svg
            width={window.innerWidth - 280}
            height={window.innerHeight - 104}
          >
            <g>
              <circle
                cx={(window.innerWidth - 280) / 2}
                cy={(window.innerHeight - 104) / 2}
                r={100}
                fill={"white"}
                stroke="black"
                strokeWidth="3"
              ></circle>
              <text
                textAnchor="middle"
                x={(window.innerWidth - 280) / 2}
                y={(window.innerHeight - 104) / 2}
              >
                {representation.title}
              </text>
            </g>
          </svg>
        )}
      </React.Fragment>
    );
  }
}

export default TreeDetailPage;
