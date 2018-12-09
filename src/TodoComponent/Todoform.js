import React from 'react';

function Todoform(props) {
  return (
    <form className='todo-form' onSubmit={props.handleSubmit}>
      <input
        type='text'
        value={props.term}
        onChange={props.onChange}
        placeholder='Start typing a todo'
      />
      <input type='submit' value='Add' />
    </form>
  );
}

export default Todoform;
