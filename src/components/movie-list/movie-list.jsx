import React, { Component } from 'react';

import { MovieCard } from '../movie-card';

import './movie-list.css';
import { MoviesApiServiceConsumer } from '../ApiService/context-movieApiService';

export default class MovieList extends Component {
  // componentDidUpdate() {
  //   console.log('Updated in movie-list ')
  // }
  // componentWillUnmount() {
  //   console.log('Unmounted in movie-list')
  // }
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
        title,
        date,
        overview,
        poster,
        rating,
        genreIdsArr,
        myRating
      } = movie
      this.minimizeOverview(overview)
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