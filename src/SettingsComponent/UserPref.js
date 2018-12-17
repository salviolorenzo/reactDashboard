import React from 'react';

function UserPref(props) {
  return (
    <div className='editSettings'>
      <h3>Choose your widgets from the list below.</h3>
      <form onSubmit={props.handleSubmit}>
        <label>
          <input type='checkbox' name='Todos' value='Todos' />
          Todos
        </label>
        <label>
          <input type='checkbox' name='Notepad' value='Notepad' />
          Notepad
        </label>
        <label>
          <input type='checkbox' name='Weather' value='Weather' />
          Weather
        </label>
        <label>
          <input type='checkbox' name='News' value='News' />
          News
        </label>
        <input type='submit' value='Save' />
      </form>
    </div>
  );
}

export default UserPref;
