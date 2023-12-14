import React from "react";

import { Pagination } from "antd";
import { MovieList } from "../movie-list";
import { InputMovieApp } from "../input-movie";
import { ErrorIndicator } from '../error-indicator';

function MovieBody(props) {

  const { onRequestToMovie,
    movies,
    ratedMovies,
    tabsKey,
    onChangePage,
    totalPages,
    errorStatus,
    error } = props;

  const pagination = <Pagination
    onChange={onChangePage}
    hideOnSinglePage={true}
    responsive={true}
    defaultPageSize={20}
    total={totalPages * 10}
    showSizeChanger={false}
    defaultCurrent={1}
  />

  const errorMovieToggle = error
    ? <ErrorIndicator status={errorStatus} />
    : <>
      {pagination}
      <MovieList
        movies={movies}
        ratedMovies={ratedMovies}
        tabsKey={tabsKey}
      />
      {/* {pagination} */}
    </>
  const inputNullToggle = tabsKey
    ? <InputMovieApp onRequestToMovie={onRequestToMovie} />
    : null

  return (
    <div className='movie-body'>
      {inputNullToggle}
      <section>
        {errorMovieToggle}
      </section>
    </div>
  )
};

export default MovieBody