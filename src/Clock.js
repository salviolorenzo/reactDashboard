import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick());
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }

  render() {
    // console.log(time);
    return (
      <div className='clock'>
        <h2>{this.state.date}</h2>
        <h2>{this.state.time}</h2>
      </div>
    );
  }
}

export default Clock;
