import React, { Component } from 'react';
import { Spin } from 'antd';
import { Offline, Online } from "react-detect-offline";

import './App.css';

import { ErrorIndicator } from '../error-indicator';
import MovieService from '../ApiService/request-movie';
import MovieBody from '../movie-body/movie-body';



  <div>
    
    <Offline>Only shown offline (surprise!)</Offline>
  </div>


export default class App extends Component {
  moviesApiService = new MovieService();
  
  state = {
    movies: [],
    loading: true
  }

  componentDidMount() {
    this.onRequestToApi()
  }
  // componentDidUpdate() {
  //   console.log('Updated in AppJSX')
  // }
  // componentWillUnmount() {
  //   console.log('Unmounted in AppJSX')
  // }

  onRequestToApi = (requestValue) => {
    this.setState({
      requestValue
    });
    this.moviesApiService
      .getMovies(requestValue)
      .then(this.onNewMoviesLoaded)
      .catch(this.onError)
  }
  onChangePage = (pageNum) => {
    const { requestValue } = this.state;
    this.moviesApiService
      .changePage(requestValue, pageNum)
      .then(this.onUpdateMovies)
      .catch(this.onError)
  }

  onNewMoviesLoaded = (requestData) => {
    const { movies, pagesNum } = requestData
    this.setState({
      movies,
      pagesNum,
      loading: false,
      error: false
    })
  };
  onUpdateMoviesLoaded = (movies) => {
    this.setState({
      movies,
      // pagesNum: this.state.pagesNum,
      loading: false,
      error: false
    })
  };
  
  onError = (err) => {
    const { message } = err
    if(message === '200') {
      this.setState({
        errorStatus: '404',
        errorMessage: 'Nothing was found for your request, please repeat your request with different parameters.',
        error: true,
        loading: false
      })
    }
    else this.setState({
      errorStatus: '500',
      errorMessage: 'Something went wrong, please repeat your request later.',
      error: true,
      loading: false
    })
  }
  
  render() {
    const { movies, loading, error, pagesNum, errorStatus, errorMessage } = this.state
    const hasData = !(loading || error)
    const spinner = loading ? <Spin size="large" /> : null
    const movieBody = hasData ? <MovieBody
                                  movies={movies}
                                  pagesNum={pagesNum}
                                  onChangePage={this.onChangePage}
                                  onRequestToApi={this.onRequestToApi}
                                  onNewMoviesLoaded={this.onNewMoviesLoaded}
                                  onError={this.onError}
                                /> : null

    const errorAlert = error ? <ErrorIndicator
                                  status={errorStatus}
                                  title='Sorry'
                                  subtitle={errorMessage}
                                /> : null


    return (
      <div className='App-substrate'>
        <Online>
          {errorAlert}
          {movieBody}
          {spinner}
          {/* {emptyRequest} */}
        </Online>
        <Offline>
          <ErrorIndicator
            status='500'
            title='Sorry'
            subtitle='Internet connection is down. Check the connection and repeat the request.'
          />
        </Offline>
      </div>
    );
  };
};