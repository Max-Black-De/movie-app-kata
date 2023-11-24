import React from "react";

import { Pagination } from "antd";
import { MovieList } from "../movie-list";
import { InputMovieApp } from "../input-movie";


function MovieBody(props) {
  const { onRequestToApi, onMoviesLoaded, onError, movies, onChangePage, pagesNum } = props
  return(
    <div className='movie-body'>
      <section>
        <InputMovieApp
          onRequestToApi={onRequestToApi}
          onMoviesLoaded={onMoviesLoaded}
          onError={onError}
        />
      </section>
      <MovieList movies={movies}/>
      <section>
        <Pagination
          onChange={onChangePage}
          defaultCurrent={1}
          total={pagesNum * 10}
        />
        </section>
    </div>
  )
};

export default MovieBody