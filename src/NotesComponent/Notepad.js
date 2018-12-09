import React, { Component } from 'react';
import Noteslist from './Noteslist';
import Editor from './Editor';

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
        },
        {
          id: 3,
          title: 'Note 3',
          content: 'I yeeted the wheat today'
        }
      ],
      focus: ''
    };
  }

  _onClick(note) {
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
    let randomId = Math.floor(Math.random() * 100);
    let newNote = {
      id: randomId,
      title: `Note ${randomId}`,
      content: ''
    };
    this.setState({
      notes: [...this.state.notes, newNote]
    });
  }

  render() {
    return (
      <div className='notepad'>
        <Noteslist
          items={this.state.notes}
          onClick={this._onClick.bind(this)}
          handleNewNote={this._handleNewNote.bind(this)}
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
