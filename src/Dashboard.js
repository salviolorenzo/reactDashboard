import React, { Component } from 'react';
import Notepad from './NotesComponent/Notepad';
import Todos from './TodoComponent/Todos';
import Weather from './WeatherComponent/Weather';
import Clock from './Clock';
import News from './NewsComponent/News';
import Keys from './config';
import NewComponent from './NextComponent/Component';

function createBackSplash(url) {
  const style = {
    backgroundImage: `url(${url})`,
    backgroundSize: `cover`,
    backgroundPosition: `center`
  };
  return style;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: '',
      backgroundUrl: '',
      time: ''
    };
  }

  componentDidMount() {
    fetch(`https://api.unsplash.com/photos/random?client_id=${Keys.USKey}`)
      .then(r => r.json())
      .then(object => {
        this.setState({
          url: object.urls.regular
        });
      });
    fetch(`/users`)
      .then(r => r.json())
      .then(console.log);
  }

  render() {
    return (
      <div className='dashboard' style={createBackSplash(this.state.url)}>
        <h1>Dashboard</h1>
        <Clock />
        <div className='tiles'>
          <Todos />
          <Weather />
          <Notepad />
          <News />
          <NewComponent />
        </div>
      </div>
    );
  }
}

export default Dashboard;
