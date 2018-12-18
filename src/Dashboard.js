import React, { Component } from 'react';
import Notepad from './NotesComponent/Notepad';
import Todos from './TodoComponent/Todos';
import Weather from './WeatherComponent/Weather';
import News from './NewsComponent/News';
import Keys from './config';
import Github from './GithubComponent/Component';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './HeaderComponent/Header';
import Settings from './SettingsComponent/Settings';

function createBackSplash(url) {
  const style = {
    backgroundImage: `url(${url})`,
    backgroundSize: `cover`,
    backgroundPosition: `center`,
    backgroundAttachment: `fixed`
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
      time: '',
      components: []
    };
  }

  componentDidMount() {
    fetch('/preferences')
      .then(r => r.json())
      .then(array => {
        let newArray = array.map(item => {
          return item.name;
        });
        this.setState({
          components: newArray
        });
      });
    console.log(this.state);
    navigator.geolocation.getCurrentPosition(createLocationObject.bind(this));
  }

  // componentDidUpdate() {
  //   fetch('/preferences')
  //     .then(r => r.json())
  //     .then(array => {
  //       let newArray = array.map(item => {
  //         return item.name;
  //       });
  //       if (newArray !== this.state.components) {
  //         this.setState({
  //           components: newArray
  //         });
  //       }
  //     });
  // }

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
          <Header />
          <h4>Loading...</h4>
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
            <Route
              path='/home'
              exact
              render={props => {
                return (
                  <div className='tiles'>
                    {this.state.components.includes('Todos') ? <Todos /> : null}
                    {this.state.components.includes('Weather') ? (
                      <Weather
                        desc={this.state.weather.desc}
                        temp={this.state.weather.temp}
                        humidity={this.state.weather.humidity}
                        wind={this.state.weather.wind}
                        url={this.state.weather.iconUrl}
                        handleClick={this._handleClick.bind(this)}
                        {...props}
                      />
                    ) : null}
                    {this.state.components.includes('Notepad') ? (
                      <Notepad />
                    ) : null}
                    {this.state.components.includes('News') ? <News /> : null}
                    <Github />
                  </div>
                );
              }}
            />

            <Route path='/home/settings' component={Settings} />

            {/* <Github /> */}
          </div>
        </Router>
      );
    }
  }
}

export default Dashboard;
