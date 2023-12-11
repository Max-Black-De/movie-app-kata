import React from "react";

import { Pagination } from "antd";
import { MovieList } from "../movie-list";
import { InputMovieApp } from "../input-movie";
import { ErrorIndicator } from '../error-indicator';


function MovieBody(props) {

  const { onRequestToMovie,
    movies,
    onChangePage,
    totalPages,
    errorStatus,
    error } = props;

  const pagination = <Pagination
  simple={false}
    onChange={onChangePage}
    hideOnSinglePage={true}
    responsive={true}
    defaultCurrent={1}
    pageSize={20}
    pageSizeOptions={[]}
    total={totalPages * 10}
    showSizeChanger={false}
  />

  const errorMovieToggle = error
    ? <ErrorIndicator status={errorStatus} />
    : <>
        {pagination}
        <MovieList movies={movies} />
      {/* {pagination} */}
      </>

  return (
    <div className='movie-body'>

      <InputMovieApp
        onRequestToMovie={onRequestToMovie}
      />
      <section>
        {errorMovieToggle}
      </section>

    </div>
  )
};

export default MovieBody