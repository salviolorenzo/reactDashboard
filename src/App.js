import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Home from './LoginComponent/Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Settings from './SettingsComponent/Settings';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Route path='/' exact component={Home} />
          <Route path='/home' component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
