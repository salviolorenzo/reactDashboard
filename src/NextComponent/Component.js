import React, { Component } from 'react';

class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      repos: '',
      followers: '',
      following: ''
    };
  }

  componentDidMount() {
    fetch('/github/data')
      .then(r => r.json())
      .then(result => {
        this.setState({
          username: result.login,
          repos: result.public_repos,
          followers: result.followers,
          following: result.following
        });
      });
  }

  render() {
    return <div className='newComp'>Your Github</div>;
  }
}

export default Github;
// NEW IDEAS:
// Spotify API -- suggest music based on weather
// Movies/Concerts nearby
