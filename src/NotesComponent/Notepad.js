import React, { Component } from 'react';
import Noteslist from './Noteslist';
import Editor from './Editor';
import Draggable from 'react-draggable';

class Notepad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      focus: '',
      user_id: 1
    };
  }

  componentDidMount() {
    fetch(`/${this.state.user_id}/notes`)
      .then(r => r.json())
      .then(resultArray => {
        this.setState({
          notes: resultArray
        });
      });
  }

  _onClick(note) {
    this.setState({
      focus: []
    });
    console.log(note);
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

  _handleTitle(note, event) {
    note.title = event.target.value;
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

  _handleNewNote() {
    fetch(`/${this.state.user_id}/notes/`, {
      method: 'POST',
      body: JSON.stringify({
        title: 'Note',
        content: ''
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(result => {
        console.log(result);
        this.setState({
          notes: [...this.state.notes, result],
          focus: result
        });
      });

    // this.setState({
    //   notes: [...this.state.notes, newNote],
    //   focus: newNote
    // });
  }

  _handleSubmit(item, e) {
    e.preventDefault();
    console.log(e.target.title.value);

    fetch(`/${this.state.user_id}/notes/${item.id}`, {
      method: 'POST',
      body: JSON.stringify({
        title: e.target.title.value,
        content: e.target.editor.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(result => {
        let newArray = this.state.notes.map(item => {
          if (item.id === result.id) {
            return result;
          } else {
            return item;
          }
        });
        this.setState({
          notes: newArray,
          focus: []
        });
      });
  }

  _handleDelete(item) {
    let index = this.state.notes.indexOf(item);
    let array = this.state.notes;
    array.splice(index, 1);

    fetch(`/${this.state.user_id}/notes/${item.id}`, {
      method: 'DELETE'
    }).then(result => {
      console.log(result);
      this.setState({
        notes: this.state.notes.filter(note => note.id !== item.id),
        focus: []
      });
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
          handleSubmit={this._handleSubmit.bind(this)}
          handleTitle={this._handleTitle.bind(this)}
        />
      </div>
    );
  }
}

export default Notepad;
