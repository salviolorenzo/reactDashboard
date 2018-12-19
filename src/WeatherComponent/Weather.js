import React, { Component } from 'react';
import Info from './Info';
import { Draggable } from 'react-beautiful-dnd';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: props.desc,
      temp: props.temp,
      humidity: props.humidity,
      wind: props.wind,
      iconUrl: props.url
    };
  }

  render() {
    if (this.state.temp === '') {
      return (
        <div className='weather'>
          <h3>Loading...</h3>
        </div>
      );
    } else {
      return (
        <Draggable draggableId='Weather' index={2}>
          {(provided, snapshot) => (
            <div
              className='weather'
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <h2>Your Weather</h2>
              <img src={this.state.iconUrl} />
              <Info
                temp={this.state.temp}
                humidity={this.state.humidity}
                wind={this.state.wind}
              />
              <button onClick={this.props.handleClick}>Reload</button>
            </div>
          )}
        </Draggable>
      );
    }
  }
}

export default Weather;
