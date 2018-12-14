import React, { Component } from 'react';
import Notepad from './NotesComponent/Notepad';
import Todos from './TodoComponent/Todos';
import Weather from './WeatherComponent/Weather';
import News from './NewsComponent/News';
import Keys from './config';
import NewComponent from './NextComponent/Component';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './HeaderComponent/Header';

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
          humidity: `${weather.main.humidity}% Humidity`,
          wind: `${weather.wind.speed} MPH`,
          iconUrl: `http://openweathermap.org/img/w/${
            weather.weather[0].icon
          }.png`
        },
        location: {
          long: location.long,
          lat: location.lat
        }
      });
      fetch(
        `https://api.unsplash.com/search/photos?query=${
          this.state.weather.desc
        }&client_id=${Keys.USKey}`
      )
        .then(r => r.json())
        .then(object => {
          console.log(object);
          let newArray = object.results.slice(0, 20);
          let ranNum = Math.floor(Math.random() * 10);
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
      location: {},
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

  _handleClick() {
    let location = this.state.location;
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
      });
  }

  render() {
    if (this.state.backgroundUrl === '') {
      return (
        <div className='dashboard'>
          <h1>Welcome</h1>
        </div>
      );
    } else {
      return (
        <Router>
          <div
            className='dashboard'
            style={createBackSplash(this.state.backgroundUrl)}
          >
            <Header />
            <div className='tiles'>
              {/* <Todos /> */}
              <Route path='/home' exact component={Todos} />
              <Route
                path='/home'
                exact
                render={props => {
                  return (
                    <Weather
                      desc={this.state.weather.desc}
                      temp={this.state.weather.temp}
                      humidity={this.state.weather.humidity}
                      wind={this.state.weather.wind}
                      url={this.state.weather.iconUrl}
                      handleClick={this._handleClick.bind(this)}
                      {...props}
                    />
                  );
                }}
              />
              <Route path='/home' exact component={Notepad} />
              <Route path='/home' exact component={News} />
              {/* <NewComponent /> */}
            </div>
          </div>
        </Router>
      );
    }
  }
}

export default Dashboard;
