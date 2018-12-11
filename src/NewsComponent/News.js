import React, { Component } from 'react';
import Keys from '../config';
import NewsList from './NewsList';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
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

  render() {
    return (
      <div className='news'>
        <h2>Today's News</h2>
        <NewsList items={this.state.stories} />
      </div>
    );
  }
}

export default News;
