import React, { Component } from 'react';
import Info from './Info';
import Keys from '../config';

function createLocationObject(object) {
  let location = {
    lat: object.coords.latitude.toFixed(),
    long: object.coords.longitude.toFixed()
  };
  console.log(location);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${
      location.long
    }&apikey=${Keys.OWKey}`
  )
    .then(r => r.json())
    .then(weather => {
      let temp = (((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(2);
      this.setState({
        name: weather.name,
        temp: `${temp} °F`,
        humidity: `${weather.main.humidity}%`,
        wind: `${weather.wind.speed} MPH`
      });
    });
  return location;
}

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      temp: '',
      humidity: '',
      wind: ''
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(createLocationObject.bind(this));
  }

  render() {
    return (
      <div className='weather'>
        <Info
          temp={this.state.temp}
          humidity={this.state.humidity}
          wind={this.state.wind}
        />
      </div>
    );
  }
}

export default Weather;
