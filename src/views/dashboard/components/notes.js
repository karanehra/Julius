import React, { Component } from 'react';
import "@styles/views/notes.scss";

class NotesPage extends Component {
  state = {  }
  drag = event => {
    console.log(event)
    event.dataTransfer.setData("id", event.target.id)
  }
  allowDrop = event => {
    event.preventDefault();
  }
  render() { 
    return ( <React.Fragment>
      <div draggable="true" onDragStart={this.drag} className="note">assdad</div>
      <div onDragOver={this.allowDrop}>drop</div>
    </React.Fragment> );
  }
}
 
export default NotesPage;