export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3';
  _apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjI5YTU0NjQwZjlkNjM5MjdhNTU2ZWNmMGJiOGJiMCIsInN1YiI6IjY1NGI1NzVhMjg2NmZhMDExYmQxNWFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IVe2c3u7HpKmqFrIwIh-Tra8FKE8-G6hR-M6WrXJ69Q'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this._apiToken}`
    }
  };
  
  async getResource(url) {
    const res = await fetch(url, this.options);
    const body = await res.json()
    console.log(res)
    console.log(body)
    if(!res.ok) {
      throw new Error(res.status)
    }
    // if(body.results.length === 0 || body.genres.length === 0) {
    //   throw new Error(res.status)
    // }
    return body
  };

  async getMovies(requestValue, page) {
    const pageNum = page || 1;
    const res = await this.getResource(`${this._apiBase}/search/movie?query=${requestValue}&include_adult=false&language=en-US&page=${pageNum}`)
    const totalPages = res.total_pages
    const movies = res.results.map(this.__transformMovieResults)
    return ({movies, totalPages})
  };

  async changePage(requestValue, pageNum) {
    const res = await this.getResource(`${this._apiBase}/3/search/movie?query=${requestValue}&include_adult=false&language=en-US&page=${pageNum}`)
    return res.results.map(this.__transformMovieResults)
  };

  async getGenreId() {
    const res = await this.getResource(`${this._apiBase}/genre/movie/list?language=en`)
    console.log(res)
  }

  __transformMovieResults(movie) {
    return{
      id: movie.id,
      title: movie.title,
      date: movie.release_date,
      overview: movie.overview,
      poster: movie.poster_path,
      rating: movie.vote_average,
      genre: movie.genre_ids
    }
  }
};



// async getPosters() {
//   fetch('https://api.themoviedb.org/3/collection/1162572/images')
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
// };