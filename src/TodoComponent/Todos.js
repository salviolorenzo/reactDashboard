import React, { Component } from 'react';
import Todolist from './Todolist';
import Todoform from './Todoform';
import { Draggable } from 'react-beautiful-dnd';
import { DraggableCore } from 'react-draggable';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      term: '',
      focus: '',
      style: {},
      user_id: 1
    };
  }

  componentDidMount() {
    fetch(`/:user_id/todos`)
      .then(r => r.json())
      .then(resultArray => {
        this.setState({
          todos: resultArray
        });
      });
  }

  _onChange(event) {
    this.setState({
      term: event.target.value
    });
    console.log(this.state.term);
  }

  _handleDelete(item) {
    let array = this.state.todos;
    array.splice(array.indexOf(item), 1);
    fetch(`/:user_id/todos/${item.id}`, {
      method: 'DELETE'
    }).then(result => {
      this.setState({
        todos: this.state.todos.filter(todo => todo.id !== item.id)
      });
    });

    this.setState({
      todos: array
    });
  }

  _onSubmit(event) {
    event.preventDefault();
    console.log(event.target.input.value);
    fetch(`/:user_id/todos`, {
      method: 'POST',
      body: JSON.stringify({
        content: event.target.input.value,
        user: 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(result => {
        console.log(result);
        this.setState({
          todos: [...this.state.todos, result],
          term: ''
        });
      });
  }

  // _handleCheck(item, event) {
  //   console.log(item);
  //   console.log(event.target);
  //   const newStyle = {
  //     textDecoration: 'strikethrough'
  //   };
  //   this.setState({
  //     style: newStyle
  //   });
  // }

  render() {
    return (
      <Draggable draggableId='draggable-1' index={0}>
        {(provided, snapshot) => (
          <div
            className='todos'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h2>Todos</h2>
            <p>(Click to delete)</p>
            <Todolist
              items={this.state.todos}
              style={this.state.style}
              handleDelete={this._handleDelete.bind(this)}
              // handleCheck={this._handleCheck.bind(this)}
            />
            <Todoform
              term={this.state.term}
              onChange={this._onChange.bind(this)}
              handleSubmit={this._onSubmit.bind(this)}
            />
          </div>
        )}
      </Draggable>
    );
  }
}

export default Todos;
