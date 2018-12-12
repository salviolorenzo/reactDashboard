import React, { Component } from 'react';
import Todolist from './Todolist';
import Todoform from './Todoform';
import Draggable from 'react-draggable';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          content: 'Wash the car'
        },
        {
          id: 2,
          content: 'Eat some food'
        },
        {
          id: 3,
          content: 'Find the kids'
        }
      ],
      term: '',
      focus: ''
    };
  }

  componentDidMount() {
    fetch(`/todos`)
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
    this.setState({
      todos: array
    });
  }

  _onSubmit(event) {
    event.preventDefault();
    let newTodo = {
      id: this.state.todos.length + 2,
      content: this.state.term
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
      term: ''
    });
  }

  render() {
    return (
      <div className='todos'>
        <h2>Todos</h2>
        <p>(Click to delete)</p>
        <Todolist
          items={this.state.todos}
          handleDelete={this._handleDelete.bind(this)}
        />
        <Todoform
          term={this.state.term}
          onChange={this._onChange.bind(this)}
          handleSubmit={this._onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default Todos;
