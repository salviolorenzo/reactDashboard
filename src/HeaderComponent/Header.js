import React, { Component } from 'react';
import Clock from './Clock';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <header>
        <button>
          <Link to='/:user_id/settings'>Settings</Link>
        </button>
        <h1>Dashboard</h1>
        <Clock />
        <form action='/logout' method='post'>
          <input type='submit' value='Log out' />
        </form>
      </header>
    );
  }
}

export default Header;
