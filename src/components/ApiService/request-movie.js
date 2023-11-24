export default class MovieService {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjI5YTU0NjQwZjlkNjM5MjdhNTU2ZWNmMGJiOGJiMCIsInN1YiI6IjY1NGI1NzVhMjg2NmZhMDExYmQxNWFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IVe2c3u7HpKmqFrIwIh-Tra8FKE8-G6hR-M6WrXJ69Q'
    }
  };
  
  async getResource(url) {
    const res = await fetch(url, this.options);
    const body = await res.json()
    // console.log(typeof res.status)
    // console.log(res)
    if(!res.ok) {
      throw new Error(res.status)
    }
    if(body.results.length === 0) {
      throw new Error(res.status)
    }
    return body
  };

  async getMovies(requestValue) {
    const res = await this.getResource(`https://api.themoviedb.org/3/search/movie?query=${requestValue}&include_adult=false&language=en-US&page=1`)
    const pagesNum = res.total_pages
    const movies = res.results.map(this.__transformMovieResults)
    return ({movies, pagesNum})
  };

  async changePage(requestValue, pageNum) {
    const res = await this.getResource(`https://api.themoviedb.org/3/search/movie?query=${requestValue}&include_adult=false&language=en-US&page=${pageNum}`)
    return res.results.map(this.__transformMovieResults)
  };

  async getTopRated() {
  const res = await this.getResource('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1')
  return res.results.map(this.__transformMovieResults)
};

  __transformMovieResults(movie) {
    return{
      id: movie.id,
      title: movie.title,
      date: movie.release_date,
      overview: movie.overview,
      poster: movie.poster_path,
    }
  }
};



// async getPosters() {
//   fetch('https://api.themoviedb.org/3/collection/1162572/images')
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
// };




// const value = 'back to the future'

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjI5YTU0NjQwZjlkNjM5MjdhNTU2ZWNmMGJiOGJiMCIsInN1YiI6IjY1NGI1NzVhMjg2NmZhMDExYmQxNWFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IVe2c3u7HpKmqFrIwIh-Tra8FKE8-G6hR-M6WrXJ69Q'
//   }
// };

// function buttonClickHandler() {
//   console.log('movie-card clicked')
//   fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`, options)
//     .then(response => response.json())
//     .then(json => console.log(json))
//   fetch('https://api.themoviedb.org/3/movie/105/images', options)
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(err => console.error(err));
// }