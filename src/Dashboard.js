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

function createLocationObject(object) {
  let location = {
    lat: object.coords.latitude.toFixed(),
    long: object.coords.longitude.toFixed()
  };
  console.log(location);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${
      location.long
    }&type=accurate&apikey=${Keys.OWKey}`
  )
    .then(r => r.json())
    .then(weather => {
      let temp = (((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(2);
      this.setState({
        weather: {
          desc: weather.weather[0].main,
          temp: `${temp} °F`,
          humidity: `${weather.main.humidity}%`,
          wind: `${weather.wind.speed} MPH`,
          iconUrl: `http://openweathermap.org/img/w/${
            weather.weather[0].icon
          }.png`
        }
      });
      fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${
          this.state.weather.desc
        }&client_id=${Keys.USKey}`
      )
        .then(r => r.json())
        .then(object => {
          console.log(object);
          let newArray = object.results.slice(0, 10);
          let ranNum = Math.floor(Math.random() * 9);
          this.setState({
            backgroundUrl: newArray[ranNum].urls.full
          });
        });
    });
  console.log('done');
  return location;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {},
      backgroundUrl: '',
      time: ''
    };
  }

  componentDidMount() {
    console.log(this.state);
    navigator.geolocation.getCurrentPosition(createLocationObject.bind(this));

    fetch(`/users`)
      .then(r => r.json())
      .then(console.log);
  }

  render() {
    if (this.state.backgroundUrl === '') {
      return (
        <div className='dashboard'>
          <h1>Welcome</h1>
          <Clock />
        </div>
      );
    } else {
      return (
        <div
          className='dashboard'
          style={createBackSplash(this.state.backgroundUrl)}
        >
          <h1>Dashboard</h1>
          <Clock />
          <div className='tiles'>
            <Todos />
            <Weather
              desc={this.state.weather.desc}
              temp={this.state.weather.temp}
              humidity={this.state.weather.humidity}
              wind={this.state.weather.wind}
              url={this.state.weather.iconUrl}
            />
            <Notepad />
            <News />
            <NewComponent />
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
