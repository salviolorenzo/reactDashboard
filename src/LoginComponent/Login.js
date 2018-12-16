import React, { Component } from 'react';

function Login(props) {
  return (
    <form action='/login' method='POST' className='homeForm'>
      <label>Username: </label>
      <input type='text' name='username' />
      <label>Password: </label>
      <input type='password' name='password' />
      <input type='submit' value='Log in' />
    </form>
  );
}

export default Login;
