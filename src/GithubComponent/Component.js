import React, { Component } from 'react';
import Stats from './Stats';
import { Draggable } from 'react-beautiful-dnd';

class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      repos: '',
      followers: '',
      following: '',
      url: '',
      reposUrl: '',
      followersUrl: '',
      followingUrl: ''
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
          following: result.following,
          url: result.html_url,
          reposUrl: result.repos_url,
          followersUrl: result.followers_url,
          followingUrl: result.following_url
        });
      });
  }

  render() {
    return (
      <Draggable draggableId='draggable-5' index={4}>
        {(provided, snapshot) => (
          <div
            className='gitHub'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h3>GitHub</h3>
            <Stats items={this.state} />
            <img
              className='chart'
              src={`http://ghchart.rshah.org/${this.state.username}`}
              alt={`${this.state.username}'s Github chart`}
            />
            <a href={this.state.url}>
              <img
                className='gitlogo'
                src={require(`../images/GitHub-Mark-64px.png`)}
              />
            </a>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Github;
// NEW IDEAS:
// Spotify API -- suggest music based on weather
// Movies/Concerts nearby
