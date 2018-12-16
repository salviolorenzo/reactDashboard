import React from 'react';

function UserInfo(props) {
  return (
    <div className='editSettings'>
      <h3>Edit your information.</h3>
      <form action='/settings' method='POST'>
        <label>Name: </label>
        <input
          type='text'
          value={props.name}
          name='name'
          onChange={props.handleNameChange}
        />
        <label>Email: </label>
        <input
          type='email'
          value={props.email}
          name='email'
          onChange={props.handleEmailChange}
        />
        <label>Username: </label>

        <input
          type='username'
          value={props.username}
          name='username'
          onChange={props.handleUsernameChange}
        />
        <input type='submit' value='Save' />
      </form>
    </div>
  );
}

export default UserInfo;
