import React, { Component } from 'react'
import '@styles/views/boards.scss'
import { Grid, Button, TextField, InputAdornment } from '@material-ui/core'
import Check from '@material-ui/icons/Check'
import {
  callPostBoardApi,
  callDeleteUserBoardApi,
  callPostCardApi,
  callPutCardApi
} from '../../../utils/apis/apiService'
import GenericText from '../../../shared/genericText'

class BoardsPage extends Component {
  state = {
    isBoardCreationActive: false,
    newBoardName: '',
    newCardTitle: '',
    addingCardToBoardId: null
  }

  drag = event => {
    event.dataTransfer.setData('abc', event.target.id)
  }

  allowDrop = event => {
    event.preventDefault()
  }

  drop = event => {
    event.preventDefault()
    var data = event.dataTransfer.getData('abc')
    console.log(data, event.target.id)
    callPutCardApi(
      {
        boardId: event.target.id
      },
      data
    ).then(res => {
      console.log(res)
    })
    event.target.appendChild(document.getElementById(data))
  }

  toggleBoardCreation = () => {
    this.setState({
      isBoardCreationActive: !this.state.isBoardCreationActive
    })
  }

  createBoard = () => {
    const { userData } = this.props
    const { newBoardName } = this.state
    callPostBoardApi({
      title: newBoardName,
      userId: userData._id
    }).then(() => {
      this.setState({
        isBoardCreationActive: false,
        newBoardName: ''
      })
    })
  }

  deleteBoard = boardId => () => {
    callDeleteUserBoardApi(boardId)
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  createCard = id => () => {
    const payload = {
      title: this.state.newCardTitle,
      boardId: id
    }
    callPostCardApi(payload).then(res => {
      if (res.status === 201) {
        this.setState({
          addingCardToBoardId: null,
          newCardTitle: ''
        })
        this.componentDidMount()
      }
    })
  }

  switchCardAddition = id => () => {
    this.setState({
      addingCardToBoardId: id
    })
  }

  cancelCardAdditon = () => {
    this.setState({
      addingCardToBoardId: null
    })
  }

  render() {
    const {
      isBoardCreationActive,
      newCardTitle,
      addingCardToBoardId
    } = this.state
    const { boards } = this.props
    return (
      <React.Fragment>
        <div className='actions'>
          <Button
            variant='contained'
            color='primary'
            onClick={this.toggleBoardCreation}
          >
            {isBoardCreationActive ? 'Cancel' : 'Add Board'}
          </Button>
        </div>
        <Grid container spacing={2}>
          {isBoardCreationActive && (
            <Grid item xs={4}>
              <div className='board'>
                <TextField
                  variant='outlined'
                  margin='dense'
                  label='Enter Board Name'
                  name='newBoardName'
                  onChange={this.handleChange}
                />
                <Button variant='outlined' onClick={this.createBoard}>
                  Ok
                </Button>
              </div>
            </Grid>
          )}
          {boards &&
            boards.map((board, i) => (
              <Grid key={i} item xs={4}>
                <div className='board'>
                  <div className='name'>
                    <GenericText size={24} bold>
                      {board.title}
                    </GenericText>
                  </div>
                  <div
                    className='cards'
                    id={board._id}
                    onDrop={this.drop}
                    onDragOver={this.allowDrop}
                  >
                    {board.cards.map(card => (
                      <div
                        key={card._id}
                        className='card'
                        id={card._id}
                        draggable
                        onDragStart={this.drag}
                      >
                        {card.title}
                      </div>
                    ))}
                    {addingCardToBoardId === board._id && (
                      <TextField
                        variant='outlined'
                        margin='dense'
                        label='Add Card'
                        name='newCardTitle'
                        value={newCardTitle}
                        onChange={this.handleChange}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position='end'
                              onClick={this.createCard(board._id)}
                            >
                              <Check />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  </div>
                  <div className='actions'>
                    <Button
                      color='primary'
                      variant='contained'
                      onClick={
                        addingCardToBoardId === board._id
                          ? this.cancelCardAdditon
                          : this.switchCardAddition(board._id)
                      }
                    >
                      {addingCardToBoardId === board._id
                        ? 'Cancel'
                        : 'Add Card'}
                    </Button>
                    <Button
                      color='secondary'
                      variant='contained'
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
    )
  }
}

export default BoardsPage
