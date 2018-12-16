import React, { Component } from 'react';

function Login(props) {
  return (
    <form action='/login' method='POST' className='homeForm'>
      <label>Username: </label>
      <br />
      <input type='text' name='username' />
      <br />
      <label>Password: </label>
      <br />
      <input type='password' name='password' />
      <br />
      <input type='submit' value='Log in' />
    </form>
  );
}

export default Login;
