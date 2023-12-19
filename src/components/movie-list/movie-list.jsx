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
    return arr.map((movie) => {
      const {
        id,
        date,
        title,
        poster,
        rating,
        myRating,
        overview,
        genreIdsArr,
      } = movie

      return (
        <MoviesApiServiceConsumer key={id}>
          {
            ({state, onRatedMovie}) => {
              return(
                <MovieCard
                  key={id}
                  date={date}
                  movieId={id}
                  title={title}
                  poster={poster}
                  rating={rating}
                  myRating={myRating}
                  genreIdsArr={genreIdsArr}
                  onRatedMovie={onRatedMovie}
                  genresDataAr={state.genresDataAr}
                  overview={this.minimizeOverview(overview)}
                />
              )
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
        {
          item
        }
      </ul>
    )
  }

};