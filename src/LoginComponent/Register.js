import React, { Component } from 'react';

function Register(props) {
  return (
    <form action='/register' method='POST' className='homeForm'>
      <h3>Sign up:</h3>
      <label>Name: </label>
      <input type='text' name='name' />
      <label>Email: </label>
      <input type='email' name='email' />
      <label>Username: </label>
      <input type='text' name='username' />
      <label>Password: </label>
      <input type='password' name='password' />
      <input type='submit' value='Log in' />
    </form>
  );
}

export default Register;
