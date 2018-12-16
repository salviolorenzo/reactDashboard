import React, { Component } from 'react';

function Register(props) {
  return (
    <form action='/register' method='POST' className='homeForm'>
      <label>Name: </label>
      <br />
      <input type='text' name='name' />
      <br />
      <label>Email: </label>
      <br />
      <input type='email' name='email' />
      <br />
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

export default Register;
