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
        <>
          <div className={this.state.className1} />
          <div className='landingPage'>
            <ul>
              <li>
                <Link to='/login'>Log in</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </ul>
            <Route path='/login' exact render={Login} />
            <Route path='/register' exact component={Register} />
          </div>
          <div className={this.state.className2} />
        </>
      </Router>
    );
  }
}

export default Home;
