import React, { Component } from 'react';

import { MovieCard } from '../movie-card';

import './movie-list.css';

export default class MovieList extends Component {

  minimizeOverview = (text) => {
    if(text.length <= 200) {
      return text
    }
    const subString = text.substring(0, 200);
    if(subString.endsWith(' ')) {
      return subString + '...'
    }
    return subString.substring(0, subString.lastIndexOf(' ')) + '...'
  }

  movieItem(arr) {
    return arr.map((movie) => {
      const { id, title, date, overview, poster, rating, genre } = movie
      this.minimizeOverview(overview)
      return  <MovieCard
        key={id}
        title={title}
        date={date}
        overview={this.minimizeOverview(overview)}
        poster={poster}
        rating={rating}
        genre={genre}
    />
    })
  }

  // componentDidMount() {
  //   console.log('Mounted in M-List')
  // }
  // componentDidUpdate() {
  //   console.log('Updated in M-List')
  // }
  // componentWillUnmount() {
  //   console.log('Unmounted in M-List')
  // }

  render() {
    const { movies } = this.props
    const item = this.movieItem(movies)
    return(
      <ul className='App-list'>
        {item}
      </ul>
    )
  }
    
};