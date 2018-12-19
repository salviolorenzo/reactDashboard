import React, { Component } from 'react';
import Keys from '../config';
import NewsList from './NewsList';
import NewsNav from './NewsNav';
import { Draggable } from 'react-beautiful-dnd';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      category: '',
      className: ''
    };
  }

  componentDidMount() {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${Keys.newsKey}`
    )
      .then(r => r.json())
      .then(results => {
        let newArray = results.articles.slice(0, 5);
        this.setState({
          stories: newArray
        });
      });
  }

  _handleClick(item) {
    item = item.toLowerCase();
    console.log(item);
    this.setState({
      category: `${item}`
    });
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${
        this.state.category
      }&apiKey=${Keys.newsKey}`
    )
      .then(r => r.json())
      .then(results => {
        let newArray = results.articles.slice(0, 5);
        this.setState({
          stories: newArray
        });
      });
  }

  _handleListClick() {
    if (this.state.className === 'animate-open') {
      this.setState({
        className: 'animate-close'
      });
    } else {
      this.setState({
        className: 'animate-open'
      });
    }
  }

  render() {
    return (
      <Draggable draggableId='News' index={3}>
        {(provided, snapshot) => (
          <div
            className='news'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <img
              src={require('../images/hamburger.png')}
              className='menuClick'
              onClick={this._handleListClick.bind(this)}
            />
            <h2>Today's News</h2>
            <NewsNav
              handleClick={this._handleClick.bind(this)}
              // handleListClick={this._handleListClick.bind(this)}
              className={this.state.className}
            />
            <NewsList items={this.state.stories} />
          </div>
        )}
      </Draggable>
    );
  }
}

export default News;
