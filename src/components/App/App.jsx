import React, { Component } from 'react';
import { Spin, Result, Tabs } from 'antd';
import { Offline, Online } from "react-detect-offline";

import './App.css';

import MovieService from '../ApiService/moviesApiService';
import MovieBody from '../movie-body/movie-body';
import { MoviesApiServiceProvider } from '../ApiService/context-movieApiService';


export default class App extends Component {
  moviesApiService = new MovieService();
  
  state = {
    movies: [],
    loading: true,
  }

  componentDidMount() {
    this.moviesApiService
      .getMovies('Home alone')
      .then(this.onLoadedDataToState)
      .catch(this.onError)
    this.moviesApiService
      .createGuestSession()
      .then(this.setSessionId)
    this.moviesApiService
      .getGenresData()
      .then(this.onLoadGenres)
      .catch(this.onError)
    console.log('Mounted in AppJSX ')
  };
  
  componentDidUpdate() {
    console.log('Updated in AppJSX ')
  }
  componentWillUnmount() {
    console.log('Unmounted in AppJSX')
  }

  onLoadGenres = (genresDataAr) => {
    this.setState({
      genresDataAr
    })
  }
  setSessionId = (sessionId) => {
    this.setState({
      sessionId
    })
  }
  onRequestToMovie = (requestValue) => {
    this.setState({
      requestValue,
    });
    this.moviesApiService
      .getMovies(requestValue)
      .then(this.onLoadedDataToState)
      .catch(this.onError)
  };

  onChangePage = (page) => {
    this.setState({
      page
    })
    const { requestValue } = this.state;
    this.moviesApiService
      .getMovies(requestValue, page)
      .then(this.onLoadedDataToState)
      .catch(this.onError)
  }

  onLoadedDataToState = (requestData) => {
    const { movies, totalPages } = requestData;
    this.setState({
      movies,
      totalPages,
      loading: false,
      error: false
    });
  };
  
  onError = (err) => {
    const { message } = err
    this.setState({
      errorStatus: message,
      error: true,
      loading: false
    })
  }
  onChangeTabs = (key) => {
    const { sessionId } = this.state
    this.moviesApiService
      .getMyRatedFilms(sessionId)
    console.log(key);
  };
  onRatedMovie = (movieId, value) => {
    const { sessionId } = this.state
    this.moviesApiService.postRatedMovie(movieId, sessionId, value)
  };
  
  render() {
    const tabsItems = [
      {
        key: '1',
        label: 'Search',
      },
      {
        key: '2',
        label: 'Rated',
      },
    ];
    const { movies, loading, error, totalPages, errorStatus} = this.state
    const hasData = !(loading && error)
    const spinner = loading ? <Spin size="large" /> : null
    const movieBody = hasData
      ? <MovieBody
          movies={movies}
          sessionId={this.state.sessionId}
          totalPages={totalPages}
          onChangePage={this.onChangePage}
          onRequestToMovie={this.onRequestToMovie}
          error={error}
          errorStatus={errorStatus}
        />
      : null


    return (
      <div className='App-substrate'>
        <MoviesApiServiceProvider value={this}>
          <Tabs centered={true} defaultActiveKey="1" items={tabsItems} onChange={this.onChangeTabs} />
          <Online>
            {movieBody}
            {spinner}
          </Online>
          <Offline>
            <Result
              status='500'
              title='Sorry'
              subtitle='Internet connection is down. Check the connection and repeat the request.'
            />
          </Offline>
        </MoviesApiServiceProvider>
      </div>
    );
  };
};