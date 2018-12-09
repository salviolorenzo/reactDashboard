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

  _onChange(note) {
    this.setState({
      notes: [...this.state.notes, note]
    });
  }

  render() {
    return (
      <div className='notepad'>
        <Noteslist
          items={this.state.notes}
          onClick={this._onClick.bind(this)}
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
