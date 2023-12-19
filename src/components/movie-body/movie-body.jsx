import React from "react";

import { Pagination } from "antd";
import { MovieList } from "../movie-list";
import { ErrorIndicator } from '../error-indicator';
import { PropTypes } from 'prop-types'

import './movie-body.css'


function MovieBody(props) {
  const {
    movies,
    onChangePage,
    totalPages,
    errorStatus,
    error,
    page,
    tabsKey

  } = props;

  const pagination = 
    <Pagination
      className='paginationMovie'
      current={page}
      onChange={(page) => onChangePage(page)}
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
      />
      {pagination}
    </>

  return (
    <div className='movie-body'>
        {errorMovieToggle}
    </div>
  )
};

// MovieBody.propDefault = {
//   currentStatus: true,
// }

MovieBody.propType = {
  movies: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  errorStatus: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
}

export default MovieBody