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

  setActiveNode = activeNodeID => () => {
    this.setState({ activeNodeID });
  };

  dragStartX = "";
  dragStartY = "";
  diffX = "";
  diffY = "";

  drag = activeNodeID => event => {
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    event.dataTransfer.setData("some", event.target.id);
    this.setState({ activeNodeID });
  };

  drop = event => {
    event.persist();
    let data = event.dataTransfer.getData("some");
    document.getElementById(data).style.top =
      document.getElementById(data).offsetTop + this.diffY;
    document.getElementById(data).style.left =
      document.getElementById(data).offsetLeft + this.diffX;
  };

  allowDrop = event => {
    event.preventDefault();
    this.diffX = event.clientX - this.dragStartX;
    this.diffY = event.clientY - this.dragStartY;
  };

  handleJoinNode = () => {
    const { joinNodeTitle, nodes } = this.state;
    let node = new Node(joinNodeTitle);
    nodes.push(node);
    this.setState({ nodes }, () => this.addLine(node.ID));
  };

  addLine = newNodeID => {
    console.log("addline");
    const { activeNodeID, connectionLines } = this.state;
    let activeNode = document.getElementById(`node-${activeNodeID}`);
    let newNode = document.getElementById(`node-${newNodeID}`);
    let line = {
      x1: activeNode.offsetLeft + activeNode.offsetWidth / 2,
      y1: activeNode.offsetTop + activeNode.offsetHeight / 2,
      x2: newNode.offsetLeft + newNode.offsetWidth / 2,
      y2: newNode.offsetTop + newNode.offsetHeight / 2
    };
    connectionLines.push(line);
    this.setState({ connectionLines });
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
        <div
          className="drag-area"
          style={{
            height: `${window.innerHeight - 104}px`,
            width: `${window.innerWidth - 280}px`
          }}
          onDrop={this.drop}
          onDragOver={this.allowDrop}
        >
          {nodes.length > 0 &&
            nodes.map((node, i) => (
              <div
                key={i}
                className={activeNodeID === node.ID ? "node active" : "node"}
                draggable
                onDragStart={this.drag(node.ID)}
                id={`node-${node.ID}`}
                onClick={this.setActiveNode(node.ID)}
              >
                {node.title}
              </div>
            ))}
        </div>
        {connectionLines.length > 0 && (
          <svg>
            {connectionLines.map((line, i) => (
              <line
                stroke="black"
                key={i}
                x1={line.x1}
                x2={line.x2}
                y1={line.y1}
                y2={line.y2}
              ></line>
            ))}
          </svg>
        )}
      </React.Fragment>
    );
  }
}

export default TreeDetailPage;
