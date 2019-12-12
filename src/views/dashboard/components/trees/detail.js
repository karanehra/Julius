import React, { Component } from "react";
import { callGetTreeByIdApi } from "../../../../utils/apis/apiService";
import { TextField, Button } from "@material-ui/core/";
import { Node, composeTreeFromObject } from "../../../../utils/treeHandler";

class TreeDetailPage extends Component {
  state = {
    treeData: null,
    representation: null,
    addNodeTitle: "",
    /**@type {Node} */
    treeInstance: null,
    activeNodeID: null
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
        representation: res.data.representation,
        ...(res.data.representation
          ? { treeInstance: composeTreeFromObject(res.data.representation) }
          : {})
      });
    });
  }

  handleAddNode = () => {
    // const {
    //   match: {
    //     params: { id }
    //   }
    // } = this.props;
    const { addNodeTitle, activeNodeID, treeInstance } = this.state;
    let node = new Node(addNodeTitle);
    treeInstance.addNodeByID(node, activeNodeID);
    this.setState({ treeInstance });
  };

  setActiveNode = activeNodeID => () => {
    console.log(activeNodeID);
    this.setState({ activeNodeID });
  };

  render() {
    const { addNodeTitle, treeInstance, activeNodeID } = this.state;
    return (
      <React.Fragment>
        <TextField
          variant="outlined"
          label={`Add node to ${activeNodeID || "_"}`}
          value={addNodeTitle}
          name="addNodeTitle"
          onChange={this.handleChange}
        />
        <Button variant="outlined" onClick={this.handleAddNode}>
          Add
        </Button>
        {treeInstance && (
          <svg
            width={window.innerWidth - 280}
            height={window.innerHeight - 104}
          >
            <g onClick={this.setActiveNode(treeInstance.ID)}>
              <circle
                cx={(window.innerWidth - 280) / 2}
                cy={(window.innerHeight - 104) / 2}
                r={100}
                fill={"white"}
                stroke={activeNodeID === treeInstance.ID ? "blue" : "red"}
                strokeWidth="3"
              ></circle>
              <text
                textAnchor="middle"
                x={(window.innerWidth - 280) / 2}
                y={(window.innerHeight - 104) / 2}
              >
                {treeInstance.title}
              </text>
            </g>
            {treeInstance.children.length &&
              treeInstance.children.map((child, i) => (
                <g key={i} onClick={this.setActiveNode(child.ID)}>
                  <circle
                    cx={
                      (window.innerWidth - 280) / 2 +
                      100 *
                        Math.cos(
                          ((Math.PI * 2) / treeInstance.children.length) * i
                        )
                    }
                    cy={
                      (window.innerHeight - 104) / 2 +
                      100 *
                        Math.sin(
                          ((Math.PI * 2) / treeInstance.children.length) * i
                        )
                    }
                    r={100}
                    fill={"white"}
                    stroke={activeNodeID === child.ID ? "blue" : "red"}
                    strokeWidth="3"
                  ></circle>
                  <text
                    textAnchor="middle"
                    x={
                      (window.innerWidth - 280) / 2 +
                      100 * Math.cos(Math.PI / 2)
                    }
                    y={
                      (window.innerHeight - 104) / 2 +
                      100 * Math.sin(Math.PI / 2)
                    }
                  >
                    {treeInstance.title}
                  </text>
                </g>
              ))}
          </svg>
        )}
      </React.Fragment>
    );
  }
}

export default TreeDetailPage;
