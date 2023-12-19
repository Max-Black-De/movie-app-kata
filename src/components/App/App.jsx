import React, { Component } from 'react';
import { Spin, Result } from 'antd';
import { Offline, Online } from "react-detect-offline";

import './App.css';

import MovieService from '../ApiService/moviesApiService';
import MovieBody from '../movie-body/movie-body';
import { MoviesApiServiceProvider } from '../ApiService/context-movieApiService';
import Header from '../header/header';

export default class App extends Component {
  moviesApiService = new MovieService();
  
  state = {
    movies: [],
    ratedMovies: [],
    totalBasePages: null,
    totalRatedPages: null,
    loading: true,
    tabsKey: true,
    requestValue: ''
  }
  onGetMovies = async (value, page) => {
    await this.moviesApiService
            .getMovies(value, page)
            .then(this.onLoadedDataToState)
            .catch(this.onError)
  };
  getRatedFilms = async (sessionId, page) => {
    await this.moviesApiService
            .getMyRatedFilms(sessionId, page)
            .then(this.onLoadedRatedDataToState)
            .catch(this.onError)
  };
  createGuestSession = async () => {
    await this.moviesApiService
            .createGuestSession()
            .then(this.setSessionId)
  };
  getGenres = async () => {
    await this.moviesApiService
      .getGenresData()
      .then(this.onLoadGenres)
      .catch(this.onError)
  };

  componentDidMount() {
    this.onGetMovies('', 1)
    this.createGuestSession()
    this.getGenres()
  };
  onLoadGenres = (genresDataAr) => {
    this.setState({
      genresDataAr
    })
  };
  setSessionId = (sessionId) => {
    this.setState({
      sessionId
    })
  };
  onRequestToMovie = (requestValue) => {
    this.resetPages(1)
    this.setState({
      requestValue
    });
    this.onGetMovies(requestValue)
  };
  onChangePage = (page) => {
    const { tabsKey, requestValue, sessionId } = this.state;
    this.setState(() => {
          return tabsKey ? {basePage: page} : {ratedPage: page}
      })
      tabsKey
        ? this.onGetMovies(requestValue, page)
        : this.getRatedFilms(sessionId, page)
  };
  resetPages = (page) => {
    this.setState({
      page
    })
  };
  onLoadedDataToState = (requestData) => {
    const { movies, totalPages, basePage } = requestData;
    this.setState({
      movies,
      totalBasePages: totalPages,
      basePage,
      loading: false,
      error: false
    });
  };
  onLoadedRatedDataToState = (requestData) => {
    const { ratedMovies, totalPages, ratedPage } = requestData;
    this.setState({
      ratedMovies,
      totalRatedPages: totalPages,
      ratedPage,
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
  };

  onChangeTabs = (key) => {
    const { requestValue, basePage, ratedPage, sessionId } = this.state
    if(key === 2) {
      this.setState({
        tabsKey: false
      })
      this.getRatedFilms(sessionId, ratedPage)
    } else {
      this.setState({
        tabsKey: true
      })
      this.onGetMovies(requestValue, basePage)
    }
  };

  onRatedMovie = async (movieId, value) => {
    const { sessionId } = this.state
    await this.moviesApiService.postRatedMovie(movieId, sessionId, value)
          this.getRatedFilms(sessionId)
    // alert('Thank you for your appreciation')
  };
  
  render() {
    const {
      movies,
      ratedMovies,
      loading,
      error,
      errorStatus,
      tabsKey,
      sessionId,
      basePage,
      ratedPage,
      totalBasePages,
      totalRatedPages
    } = this.state
    const hasData = !(loading && error)
    const spinner = loading ? <Spin size="large" /> : null
    const movieBody = hasData
      ? <MovieBody
          movies={tabsKey ? movies : ratedMovies}
          page={tabsKey ? basePage : ratedPage}
          sessionId={sessionId}
          totalPages={tabsKey ? totalBasePages : totalRatedPages}
          onChangePage={this.onChangePage}
          error={error}
          errorStatus={errorStatus}
        />
      : null


    return (
      <div className='App-substrate'>
        <MoviesApiServiceProvider value={this}>
          <Header
            onChangeTabs={this.onChangeTabs}
            onRequestToMovie={this.onRequestToMovie}
            tabsKey={tabsKey}
          />
          <Online>
            {spinner}
            {movieBody}
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