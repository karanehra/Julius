import React, { Component } from "react";
import "@styles/views/notes.scss";
import { Grid, Button, TextField } from "@material-ui/core";

class NotesPage extends Component {
  state = {
    boards: [],
    isBoardCreationActive: false
  };

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

  createBoard = () => {
    let board = {
      title: null
    };
    let { boards } = this.state;
    boards.push(board);
    this.setState({
      boards
    });
  };

  render() {
    const { boards } = this.state;
    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={this.createBoard}>
          Add Board
        </Button>
        <Grid container>
          {boards.map((board, i) => (
            <Grid
              key={i}
              onDrop={this.drop}
              onDragOver={this.allowDrop}
              item
              xs={4}
              className="board"
            >
              {board.title ? (
                board.title
              ) : (
                <TextField
                  variant="outlined"
                  margin="dense"
                  label="Enter Board Name"
                />
              )}
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default NotesPage;
