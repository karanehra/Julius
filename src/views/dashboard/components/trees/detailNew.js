import React, { Component } from "react";
import { callGetTreeByIdApi } from "../../../../utils/apis/apiService";
import { TextField, Button, Typography } from "@material-ui/core/";
import { Node, composeTreeFromObject } from "../../../../utils/treeHandler";
import "@styles/views/tree.scss";

class TreeDetailPage extends Component {
  state = {
    treeData: null,
    representation: null,
    addNodeTitle: "",
    joinNodeTitle: "",
    /**@type {Node} */
    treeInstance: null,
    activeNodeID: "",
    nodes: [],
    connectionLines: []
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
    const { addNodeTitle, nodes } = this.state;
    let node = new Node(addNodeTitle);
    nodes.push(node);
    this.setState({ nodes });
  };

  handleJoinNode = () => {
    const { joinNodeTitle, nodes } = this.state;
    let node = new Node(joinNodeTitle);
    nodes.push(node);
    this.setState({ nodes }, () => this.addLine(node.ID));
  };

  addLine = newNodeID => {
    const { activeNodeID, connectionLines } = this.state;
    let activeNode = document.getElementById(`node-${activeNodeID}`);
    let newNode = document.getElementById(`node-${newNodeID}`);
    let line = {
      x1: activeNode.getAttribute("cx"),
      y1: activeNode.getAttribute("cy"),
      x2: newNode.getAttribute("cx"),
      y2: newNode.getAttribute("cy"),
      id1: activeNodeID,
      id2: newNodeID
    };
    connectionLines.push(line);
    this.setState({ connectionLines });
  };

  selectedNode = null;
  dragStartX = "";
  dragStartY = "";
  diffX = "";
  diffY = "";

  onClickDown = activeNodeID => event => {
    const { clientX, clientY, target } = event;
    this.dragStartX = clientX;
    this.dragStartY = clientY;
    this.selectedNode = target;
    this.setState({ activeNodeID });
  };

  onClickDrag = e => {
    const { activeNodeID } = this.state;
    if (this.selectedNode) {
      var dx =
        parseInt(this.selectedNode.getAttribute("cx")) +
        e.clientX -
        this.dragStartX;
      var dy =
        parseInt(this.selectedNode.getAttribute("cy")) +
        e.clientY -
        this.dragStartY;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
      this.selectedNode.setAttribute("cx", dx);
      this.selectedNode.setAttribute("cy", dy);
      this.updateLines(activeNodeID);
    }
  };

  updateLines = nodeID => {
    const { connectionLines } = this.state;
    for (let i = 0; i < connectionLines.length; i++) {
      if (connectionLines[i].id1 === nodeID) {
        connectionLines[i] = {
          ...connectionLines[i],
          x1: document.getElementById(`node-${nodeID}`).getAttribute("cx"),
          y1: document.getElementById(`node-${nodeID}`).getAttribute("cy")
        };
      } else if (connectionLines[i].id2 === nodeID) {
        connectionLines[i] = {
          ...connectionLines[i],
          x2: document.getElementById(`node-${nodeID}`).getAttribute("cx"),
          y2: document.getElementById(`node-${nodeID}`).getAttribute("cy")
        };
      }
    }
    this.setState({ connectionLines });
  };

  onClickUp = () => {
    this.selectedNode = null;
  };

  render() {
    const {
      addNodeTitle,
      nodes,
      activeNodeID,
      joinNodeTitle,
      connectionLines
    } = this.state;
    return (
      <React.Fragment>
        <div className="toolbar">
          <Typography variant="h5" className="selected-node">
            <b>{activeNodeID}</b>
          </Typography>
          <TextField
            variant="outlined"
            label={`Add node`}
            value={addNodeTitle}
            margin="dense"
            name="addNodeTitle"
            onChange={this.handleChange}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.handleAddNode}
          >
            Add
          </Button>
          <TextField
            variant="outlined"
            label={`Join node to ${activeNodeID}`}
            value={joinNodeTitle}
            margin="dense"
            name="joinNodeTitle"
            onChange={this.handleChange}
            disabled={!activeNodeID}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.handleJoinNode}
            disabled={!activeNodeID}
          >
            Join
          </Button>
        </div>
        <svg
          height={`${window.innerHeight - 104}px`}
          width={`${window.innerWidth - 280}px`}
          className="drag-area"
        >
          {connectionLines.length > 0 &&
            connectionLines.map((line, i) => (
              <line
                key={i}
                stroke="black"
                x1={line.x1}
                x2={line.x2}
                y1={line.y1}
                y2={line.y2}
                strokeWidth={2}
              ></line>
            ))}
          {nodes.length > 0 &&
            nodes.map((node, i) => (
              <circle
                key={i}
                onMouseDown={this.onClickDown(node.ID)}
                id={`node-${node.ID}`}
                onMouseMove={this.onClickDrag}
                onMouseUp={this.onClickUp}
                cx={(window.innerWidth - 280) / 2}
                cy={(window.innerHeight - 104) / 2}
                r={30}
                fill={"white"}
                strokeWidth="3"
                stroke={"black"}
              ></circle>
            ))}
        </svg>
      </React.Fragment>
    );
  }
}

export default TreeDetailPage;
