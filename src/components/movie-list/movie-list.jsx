/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PropTypes } from 'prop-types';

import { MovieCard } from '../movie-card';
import { MoviesApiServiceConsumer } from '../ApiService/context-movieApiService';
import './movie-list.css';

export default class MovieList extends Component {

  minimizeOverview = (text) => {
    if (text.length <= 200) {
      return text
    }
    const subString = text.substring(0, 200);
    if (subString.endsWith(' ')) {
      return `${subString}...`
    }
    return `${subString.substring(0, subString.lastIndexOf(' '))}...`
  }

  movieItem(arr, tabsKey, genresDataAr) {
    if (arr.length !== 0) {
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
              ({ onRatedMovie }) => (
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
                  genresDataAr={genresDataAr}
                  overview={this.minimizeOverview(overview)}
                />
              )
            }
          </MoviesApiServiceConsumer>
        );
      });
    }
    return (
      tabsKey
        ? <h1 className='splash'>Enter the movie you are interested in</h1>
        : <h1 className='splash'>Rate any movie</h1>
    )

  }

  render() {
    const { movies, tabsKey, genresDataAr } = this.props
    const item = this.movieItem(movies, tabsKey, genresDataAr)
    return (
      <ul className='App-list'>
        {
          item
        }
      </ul>
    )
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf.isRequired,
  genresDataAr: PropTypes.arrayOf.isRequired,
  tabsKey: PropTypes.bool.isRequired
}