import React, { Component } from 'react';

import { MovieCard } from '../movie-card';

import './movie-list.css';
import { MoviesApiServiceConsumer } from '../ApiService/context-movieApiService';

export default class MovieList extends Component {

  minimizeOverview = (text) => {
    if (text.length <= 200) {
      return text
    }
    const subString = text.substring(0, 200);
    if (subString.endsWith(' ')) {
      return subString + '...'
    }
    return subString.substring(0, subString.lastIndexOf(' ')) + '...'
  }

  movieItem(arr) {
    // this.getMoviesGenres()
    return arr.map((movie) => {
      const { id, title, date, overview, poster, rating, genreIdsArr } = movie
      this.minimizeOverview(overview)
      return (
        <MoviesApiServiceConsumer key={id}>
          {
            (genresDataAr) => {
              return <MovieCard
                key={id}
                title={title}
                date={date}
                overview={this.minimizeOverview(overview)}
                poster={poster}
                rating={rating}
                genreIdsArr={genreIdsArr}
                genresDataAr={genresDataAr}
              />
            }
          }
        </MoviesApiServiceConsumer>

      )
    })
  }

  render() {
    const { movies } = this.props
    const item = this.movieItem(movies)
    return (
      <ul className='App-list'>
        {item}
      </ul>
    )
  }

};