import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import UserPref from './UserPref';

const style = {
  textDecoration: 'underline'
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      term: '',
      style: {},
      linkedToGithub: props.linkedToGithub,
      checkedBoxes: props.checkedBoxes
    };
  }

  componentDidMount() {
    fetch('/home/settings')
      .then(r => r.json())
      .then(result => {
        this.setState({
          user: {
            id: result.id,
            name: result.name,
            email: result.email,
            username: result.username,
            pw: result.password
          }
        });
      });
  }

  _handleNameChange(event) {
    this.setState({
      user: {
        ...this.state.user,
        name: event.target.value
      }
    });
  }
  _handleEmailChange(event) {
    this.setState({
      user: {
        ...this.state.user,
        email: event.target.value
      }
    });
  }
  _handleUsernameChange(event) {
    this.setState({
      user: {
        ...this.state.user,
        username: event.target.value
      }
    });
  }

  _handleSubmit(event) {
    event.preventDefault();
    const compArray = [];
    const uncheckedArray = [];
    if (event.target.Todos.checked === true) {
      compArray.push(event.target.Todos.value);
    } else {
      uncheckedArray.push(event.target.Todos.value);
    }
    if (event.target.Notepad.checked === true) {
      compArray.push(event.target.Notepad.value);
    } else {
      uncheckedArray.push(event.target.Notepad.value);
    }
    if (event.target.Weather.checked === true) {
      compArray.push(event.target.Weather.value);
    } else {
      uncheckedArray.push(event.target.Weather.value);
    }
    if (event.target.News.checked === true) {
      compArray.push(event.target.News.value);
    } else {
      uncheckedArray.push(event.target.News.value);
    }
    if (event.target.GitHub.checked === true) {
      compArray.push(event.target.GitHub.value);
    } else {
      uncheckedArray.push(event.target.GitHub.value);
    }
    fetch('/preferences', {
      method: 'POST',
      body: JSON.stringify({
        array: compArray,
        delArray: uncheckedArray
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(array => {
        console.log(array);
      });
  }

  render() {
    return (
      <Router>
        <div className='settings'>
          <ul className='settingsNav'>
            <li>
              <Link to='/home/settings/userInfo'>User Info</Link>
            </li>
            <li>
              <Link to='/home/settings/userPreferences'>User Preferences</Link>
            </li>
          </ul>
          <Route
            path='/home/settings/userInfo'
            render={props => {
              return (
                <UserInfo
                  name={this.state.user.name}
                  email={this.state.user.email}
                  username={this.state.user.username}
                  handleNameChange={this._handleNameChange.bind(this)}
                  handleEmailChange={this._handleEmailChange.bind(this)}
                  handleUsernameChange={this._handleUsernameChange.bind(this)}
                  linkedToGithub={this.state.linkedToGithub}
                  {...props}
                />
              );
            }}
          />
          <Route
            path='/home/settings/userPreferences'
            render={props => {
              return (
                <UserPref
                  handleSubmit={this._handleSubmit.bind(this)}
                  {...props}
                />
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

export default Settings;
