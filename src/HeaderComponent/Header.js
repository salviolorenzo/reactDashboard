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
        <div className='top-bar'>
          <button>
            <Link to='/settings'>Settings</Link>
          </button>
          <h1>Dashboard</h1>
          <form action='/logout' method='post'>
            <input type='submit' value='Log out' />
          </form>
        </div>
        <Clock />
      </header>
    );
  }
}

export default Header;
