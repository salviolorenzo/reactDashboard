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
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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
            backgroundUrl: newArray[ranNum].urls.regular
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
      components: [],
      linkedToGithub: false,
      compList: [],
      className: 'curtain'
    };
  }

  componentDidMount() {
    fetch('/preferences')
      .then(r => r.json())
      .then(array => {
        let newArray = array.map(item => {
          console.log(item);
          return { name: item.name, index: item.index };
        });
        this.setState({
          components: newArray
        });
      });
    console.log(this.state);
    navigator.geolocation.getCurrentPosition(createLocationObject.bind(this));
    {
      fetch('/github/login/check')
        .then(r => r.json())
        .then(result => {
          this.setState({
            linkedToGithub: result,
            compList: {
              Todos: <Todos />,
              Notepad: <Notepad />,
              News: <News />,
              GitHub: <Github />
            }
          });
        });
    }
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

  onBeforeDragStart() {
    return;
  }

  onDragStart() {
    return;
  }

  onDragUpdate() {
    return;
  }

  onDragEnd(result) {
    console.log(result);
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const array = this.state.components;
    array.splice(source.index, 1);
    array.splice(destination.index, 0, {
      name: draggableId,
      index: destination.index
    });
    this.setState({
      components: array
    });
    return;
  }

  handleEnter() {
    this.setState({
      className: 'curtain-down'
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
        <DragDropContext
          onBeforeDragStart={this.onBeforeDragStart}
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd.bind(this)}
        >
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
                    <Droppable droppableId='droppable-1'>
                      {(provided, snapshot) => (
                        <div
                          className='tiles'
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {this.state.components.map(item => {
                            if (item.name === 'Weather') {
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
                            } else {
                              return this.state.compList[item.name];
                            }
                          })}
                          {/* {this.state.components.includes('Todos') ? (
                            <Todos />
                          ) : null}
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
                          {this.state.components.includes('News') ? (
                            <News />
                          ) : null}
                          {this.state.components.includes('GitHub') ? (
                            <Github />
                          ) : null} */}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  );
                }}
              />

              <Route
                path='/home/settings'
                render={props => {
                  return (
                    <Settings
                      linkedToGithub={this.state.linkedToGithub}
                      checkedBoxes={this.state.components}
                      {...props}
                    />
                  );
                }}
              />

              {/* <Github /> */}
            </div>
          </Router>
        </DragDropContext>
      );
    }
  }
}

export default Dashboard;
