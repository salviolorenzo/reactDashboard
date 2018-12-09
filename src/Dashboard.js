import React, { Component } from 'react';
import Notepad from './NotesComponent/Notepad';
import Todos from './TodoComponent/Todos';
import Weather from './WeatherComponent/Weather';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <Todos />
        {/* <Weather /> */}
        <Notepad />
      </div>
    );
  }
}

export default Dashboard;
