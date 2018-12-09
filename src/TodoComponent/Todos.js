import React, { Component } from 'react';
import Todolist from './Todolist';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      focus: ''
    };
  }

  render() {
    return (
      <div className='todos'>
        <h2>Todos</h2>
        <Todolist />
      </div>
    );
  }
}

export default Todos;
