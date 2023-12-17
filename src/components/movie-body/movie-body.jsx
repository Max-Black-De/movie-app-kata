import React from "react";

import { Pagination } from "antd";
import { MovieList } from "../movie-list";
import { ErrorIndicator } from '../error-indicator';


function MovieBody(props) {
  const {
    movies,
    onChangePage,
    totalPages,
    errorStatus,
    error,
    page,
  } = props;
    
  const pagination = 
    <Pagination
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
      />
      {pagination}
    </>

  return (
    <div className='movie-body'>
      <section>
        {errorMovieToggle}
      </section>
    </div>
  )
};

export default MovieBody