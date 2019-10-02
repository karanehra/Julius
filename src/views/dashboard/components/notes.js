import React, { Component } from "react";
import "@styles/views/notes.scss";
import { Grid, Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { getUserBoardsDataAsync } from "../../../actions/notes.action";
import { callPostBoardApi } from "../../../utils/apis/apiService";
import GenericText from '../../../shared/genericText';

class NotesPage extends Component {
  state = {
    isBoardCreationActive: false
  };

  componentDidMount() {
    const { dispatch, userData } = this.props;
    dispatch(getUserBoardsDataAsync(userData.id));
  }

  drag = event => {
    event.dataTransfer.setData("id", event.target.id);
  };

  allowDrop = event => {
    event.preventDefault();
  };

  drop = event => {
    event.preventDefault();
    var data = event.dataTransfer.getData("id");
    event.target.appendChild(document.getElementById(data));
  };

  toggleBoardCreation = () => {
    this.setState({
      isBoardCreationActive: !this.state.isBoardCreationActive
    });
  };

  createBoard = () => {
    const { dispatch, userData } = this.props;
    callPostBoardApi({
      name: "Board",
      userId: userData.id
    }).then(res => {
      dispatch(getUserBoardsDataAsync(userData.id));
    });
  };

  render() {
    const { isBoardCreationActive } = this.state;
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          onClick={this.toggleBoardCreation}
        >
          {isBoardCreationActive ? "Cancel" : "Add Board"}
        </Button>
        <Grid container spacing={2}>
          {isBoardCreationActive && (
            <Grid onDrop={this.drop} onDragOver={this.allowDrop} item xs={4}>
              <div className="board">
                <TextField variant="outlined" label="Enter Board Name" />
                <Button variant="outlined" onClick={this.createBoard}>Ok</Button>
              </div>
            </Grid>
          )}
          {this.props.boards.map((board, i) => (
            <Grid
              key={i}
              onDrop={this.drop}
              onDragOver={this.allowDrop}
              item
              xs={4}
            >
              <div className="board">
                <GenericText size={24} bold>{board.name}</GenericText>
              </div>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.usersReducer.userData.user,
  boards: state.notesReducer.boardsData
});

export default connect(mapStateToProps)(NotesPage);
