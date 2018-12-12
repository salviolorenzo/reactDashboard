import React, { Component } from 'react';
import Noteslist from './Noteslist';
import Editor from './Editor';
import Draggable from 'react-draggable';

class Notepad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          id: 1,
          title: 'Note 1',
          content: 'Today i went to the store and that was it, it was cool'
        },
        {
          id: 2,
          title: 'Note 2',
          content: 'nothing happened today '
        }
      ],
      focus: ''
    };
  }

  componentDidMount() {
    fetch('/notes')
      .then(r => r.json())
      .then(resultArray => {
        this.setState({
          notes: resultArray
        });
      });
  }

  _onClick(note) {
    // console.log(note);
    this.setState({
      focus: note
    });
  }

  _onChange(note, event) {
    note.content = event.target.value;
    console.log(event.target.value);
    let newArray = this.state.notes.map(item => {
      if (item.id === note.id) {
        return note;
      } else {
        return item;
      }
    });
    this.setState({
      notes: newArray
    });
  }

  // _getById(idToFind) {
  //   let note = this.state.notes.filter(item => {
  //     if (item.id === idToFind) {
  //       return item;
  //     }
  //   });
  //   return note;
  // }

  _handleNewNote(event) {
    console.log('new');
    let newId = this.state.notes.length + 1;
    let newNote = {
      id: newId,
      title: `Note ${newId}`,
      content: ''
    };
    this.setState({
      notes: [...this.state.notes, newNote],
      focus: newNote
    });
  }

  _handleDelete(item) {
    let index = this.state.notes.indexOf(item);
    let array = this.state.notes;
    array.splice(index, 1);
    this.setState({
      notes: array,
      focus: ''
    });
  }

  render() {
    return (
      <div className='notepad'>
        <h2>Notes</h2>
        <p>(Click X to delete)</p>
        <Noteslist
          items={this.state.notes}
          onClick={this._onClick.bind(this)}
          handleNewNote={this._handleNewNote.bind(this)}
          handleDelete={this._handleDelete.bind(this)}
        />
        <Editor
          content={this.state.focus}
          onChange={this._onChange.bind(this)}
        />
      </div>
    );
  }
}

export default Notepad;
