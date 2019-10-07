import React, { Component } from "react";
import "@styles/views/notes.scss";
import { Grid, Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { getUserBoardsDataAsync } from "../../../actions/notes.action";
import {
  callPostBoardApi,
  callDeleteUserBoardApi
} from "../../../utils/apis/apiService";
import GenericText from "../../../shared/genericText";

class BoardsPage extends Component {
  state = {
    isBoardCreationActive: false,
    newBoardName: ""
  };

  componentDidMount() {
    const { dispatch, userData } = this.props;
    dispatch(getUserBoardsDataAsync(userData._id));
  }

  drag = event => {
    event.dataTransfer.setData("abc", event.target.id);
  };

  allowDrop = event => {
    event.preventDefault();
  };

  drop = event => {
    event.preventDefault();
    var data = event.dataTransfer.getData("abc");
    event.target.appendChild(document.getElementById(data));
  };

  toggleBoardCreation = () => {
    this.setState({
      isBoardCreationActive: !this.state.isBoardCreationActive
    });
  };

  createBoard = () => {
    const { dispatch, userData } = this.props;
    const { newBoardName } = this.state;
    callPostBoardApi({
      title: newBoardName,
      userId: userData._id
    }).then(res => {
      dispatch(getUserBoardsDataAsync(userData._id));
    });
  };

  deleteBoard = boardId => () => {
    const { dispatch, userData } = this.props;
    callDeleteUserBoardApi(boardId).then(res => {
      if (res.status === 200) {
        dispatch(getUserBoardsDataAsync(userData._id));
      }
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { isBoardCreationActive } = this.state;
    const { boards } = this.props;
    return (
      <React.Fragment>
        <div className="actions">
          <Button
            variant="contained"
            color="primary"
            onClick={this.toggleBoardCreation}
          >
            {isBoardCreationActive ? "Cancel" : "Add Board"}
          </Button>
        </div>
        <Grid container spacing={2}>
          {isBoardCreationActive && (
            <Grid item xs={4}>
              <div className="board">
                <TextField
                  variant="outlined"
                  margin="dense"
                  label="Enter Board Name"
                  name="newBoardName"
                  onChange={this.handleChange}
                />
                <Button variant="outlined" onClick={this.createBoard}>
                  Ok
                </Button>
              </div>
            </Grid>
          )}
          {boards &&
            boards.map((board, i) => (
              <Grid
                key={i}
                onDrop={this.drop}
                onDragOver={this.allowDrop}
                item
                xs={4}
              >
                <div className="board">
                  <div className="name">
                    <GenericText size={24} bold>
                      {board.title}
                    </GenericText>
                  </div>
                  <div
                    className="notes"
                    onDrop={this.drop}
                    onDragOver={this.allowDrop}
                  >
                    <div
                      className="note"
                      id={"hey" + i}
                      draggable
                      onDragStart={this.drag}
                    >
                      asdasd
                    </div>
                  </div>
                  <div className="actions">
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={this.deleteBoard(board._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Grid>
            ))}
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.usersReducer.userData,
  boards: state.notesReducer.boardsData
});

export default connect(mapStateToProps)(BoardsPage);
