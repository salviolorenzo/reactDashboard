import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className='landingPage'>
          <ul>
            <li>
              <Link to='/login'>Log in</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </ul>
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
        </div>
      </Router>
    );
  }
}

export default Home;
