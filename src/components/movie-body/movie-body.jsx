import React from "react";

import { Pagination } from "antd";
import { PropTypes } from 'prop-types'
import { MovieList } from "../movie-list";
import { ErrorIndicator } from '../error-indicator';

import './movie-body.css'


function MovieBody(props) {
  const {
    movies,
    onChangePage,
    totalPages,
    genresDataAr,
    errorStatus,
    error,
    page,
    tabsKey

  } = props;

  const pagination =
    <Pagination
      className='paginationMovie'
      current={page}
      onChange={(event) => onChangePage(event)}
      hideOnSinglePage
      responsive={false}
      defaultPageSize={20}
      total={totalPages * 20}
      showSizeChanger={false}
      defaultCurrent={1}
    />

  const errorMovieToggle = error
    ? <ErrorIndicator status={errorStatus} />
    : <>
      {pagination}
      <MovieList
        movies={movies}
        tabsKey={tabsKey}
        genresDataAr={genresDataAr}
      />
      {pagination}
    </>

  return (
    <div className='movie-body'>
      {errorMovieToggle}
    </div>
  )
}

MovieBody.propDefault = {
  error: false,
}

MovieBody.propTypes = {
  movies: PropTypes.array.isRequired,
  genresDataAr: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  totalPages: PropTypes.number,
  errorStatus: PropTypes.string,
  error: PropTypes.bool,
  tabsKey: PropTypes.bool.isRequired,
  page: PropTypes.number,
}

export default MovieBody