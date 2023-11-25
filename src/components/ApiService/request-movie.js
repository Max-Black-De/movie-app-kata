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

  async getMovies(requestValue, page) {
    const pageNum = page || 1;
    const res = await this.getResource(`${this._apiBase}/search/movie?query=${requestValue}&include_adult=false&language=en-US&page=${pageNum}`)
    const totalPages = res.total_pages
    const movies = res.results.map(this.__transformMovieResults)
    return ({movies, totalPages})
  };

  async changePage(requestValue, pageNum) {
    const res = await this.getResource(`https://api.themoviedb.org/3/search/movie?query=${requestValue}&include_adult=false&language=en-US&page=${pageNum}`)
    return res.results.map(this.__transformMovieResults)
  };

  async getTrending() {
    const res = await this.getResource(`${this._apiBase}/trending/movie/day?language=en-US`)
    // const res = await this.getResource(`${this._apiBase}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)
    const totalPages = res.total_pages
  const movies = res.results.map(this.__transformMovieResults)
  return ({movies, totalPages})
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