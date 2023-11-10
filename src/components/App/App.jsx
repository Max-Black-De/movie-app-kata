import React, { Component } from 'react';
// import uuid from 'react-uuid';

import './App.css';

import { MovieCard } from '../movie-card';
import MovieService from '../ApiService/request-movie';

export default class App extends Component {
  
  
  state = {
    movies: [],
    
  };
  moviesApiService = new MovieService();

  onMoviesLoaded = (movies) => {
    this.setState({movies})
  };

  buttonClickHandler = () => {
    // this.moviesApiService.getMovies()
    //   .then(this.onMoviesLoaded)
    //   .catch(err => console.error(err));
    this.moviesApiService.getTopRated()
      .then(this.onMoviesLoaded)
      .catch(err => console.error(err));
      // .then((movies) => {
      //   this.setState({
      //     movies: movies
      //   });
      // });

  };

  render() {



    return (
      <div className='App-substrate'>
        <button style={{marginTop: 20}} onClick={this.buttonClickHandler}>Get movies</button>
        <ul className='App-list'>
          {this.state.movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              date={movie.date}
              overview={movie.overview}
              poster={movie.poster}

            />
          ))}
        </ul>
      </div>
    );
  };
};





