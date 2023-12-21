import React, { Component } from 'react';
import { Spin, Result } from 'antd';
import { Offline, Online } from "react-detect-offline";

import './App.css';

import MovieService from '../ApiService/moviesApiService';
import { MovieBody } from '../movie-body';
import { MoviesApiServiceProvider } from '../ApiService/context-movieApiService';
import { Header } from '../header';

export default class App extends Component {
  moviesApiService = new MovieService();

  state = {
    movies: [],
    ratedMovies: [],
    genresDataAr: [],
    totalBasePages: null,
    totalRatedPages: null,
    loading: true,
    tabsKey: true,
    requestValue: ''
  }

  componentDidMount() {
    this.onGetMovies('', 1)
    this.createGuestSession()
    this.getGenres()
  }

  onGetMovies = async (value, page) => {
    await this.moviesApiService
      .getMovies(value, page)
      .then(this.onLoadedDataToState)
      .catch(this.onError)
  };
  onRequestMoviesByInput = async (value, page) => {
    await this.moviesApiService
      .requestMovie(value, page)
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
      .then((sessionId) => this.setState({ sessionId }))
      .catch(this.onError)
  };

  getGenres = async () => {
    await this.moviesApiService
      .getGenresData()
      .then((genresDataAr) => this.setState({ genresDataAr }))
      .catch(this.onError)
  };

  onRequestToMovie = (requestValue) => {
    this.setState({
      requestValue
    });
    this.onRequestMoviesByInput(requestValue)
  };

  onChangePage = (page) => {
    const { tabsKey, requestValue, sessionId } = this.state;
    this.setState(() => tabsKey ? { basePage: page } : { ratedPage: page })
    tabsKey
      ? this.onGetMovies(requestValue, page)
      : this.getRatedFilms(sessionId, page)
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
    if (key === 2) {
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
      genresDataAr,
      totalBasePages,
      totalRatedPages
    } = this.state

    const hasData = !(loading && error)
    const spinner = loading ? <Spin size="large" /> : null
    const movieBody = hasData
      ? <MovieBody
        tabsKey={tabsKey}
        sessionId={sessionId}
        genresDataAr={genresDataAr}
        movies={tabsKey ? movies : ratedMovies}
        page={tabsKey ? basePage : ratedPage}
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
          <Online className='onlineComponent' style={{ width: 100 }}>
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
  }
}