import React, { Component } from 'react';

import { MovieCard } from '../movie-card';

import './movie-list.css';

export default class MovieList extends Component {

  movieItem(arr) {
    return arr.map((movie) => {
      return  <MovieCard
        key={movie.id}
        title={movie.title}
        date={movie.date}
        overview={movie.overview}
        poster={movie.poster}
    />
    })
  }

  componentDidMount() {
    console.log('Mounted in M-ListJSX')
  }
  componentDidUpdate() {
    console.log('updated')
  }
  componentWillUnmount() {
    console.log('Unmounted')
  }

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