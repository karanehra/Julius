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

  makeDraggable = event => {
    console.log(event);
  };

  dragStartX = "";
  dragStartY = "";

  drag = event => {
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    event.dataTransfer.setData("some", event.target.id);
  };

  drop = event => {
    event.persist();
    let data = event.dataTransfer.getData("some");
    document.getElementById(data).style.top = event.clientY;
    document.getElementById(data).style.left = event.clientX;
  };

  allowDrop = event => {
    event.preventDefault();
    console.log(
      this.dragStartX - event.clientX,
      this.dragStartY - event.clientY
    );
    console.log(event.target.id);
    let diffX = event.clientX - this.dragStartX;
    let diffY = event.clientY - this.dragStartY;
    event.target.style.left = `${event.target.style.left + diffX}px`;
    event.target.style.top = `${event.target.style.top + diffY}px`;
    // console.log(
    //   "allowdrop",
    //   event.clientX,
    //   event.clientY,
    //   event.screenX,
    //   event.screenY,
    //   event.currentTarget
    // );
    // event.currentTarget.style.top = event.clientX;
    // event.currentTarget.style.left = event.clientY;
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
        <div
          className="drag-area"
          style={{
            height: `${window.innerHeight - 104}px`,
            width: `${window.innerWidth - 280}px`
          }}
          onDrop={this.drop}
          onDragOver={this.allowDrop}
        >
          {treeInstance && (
            <div
              style={{ width: "300px", height: "300px", position: "absolute" }}
              draggable
              onDragStart={this.drag}
              id="div1"
            >
              <svg width={300} height={300}>
                <g onClick={this.setActiveNode(treeInstance.ID)}>
                  <circle
                    cx={150}
                    cy={150}
                    r={50}
                    fill={"white"}
                    stroke={activeNodeID === treeInstance.ID ? "blue" : "red"}
                    strokeWidth="3"
                  ></circle>
                  <text textAnchor="middle" x={150} y={150}>
                    {treeInstance.title}
                  </text>
                </g>
              </svg>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default TreeDetailPage;
