import React, { Component } from 'react';
import Keys from '../config';
import NewsList from './NewsList';
import NewsNav from './NewsNav';

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
    if (this.state.className === 'animate') {
      this.setState({
        className: ''
      });
    } else {
      this.setState({
        className: 'animate'
      });
    }
  }

  render() {
    return (
      <div className='news'>
        <img
          src='../images/dash.jpeg'
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
    );
  }
}

export default News;
