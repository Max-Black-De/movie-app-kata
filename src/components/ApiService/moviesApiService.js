export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3';
  _apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjI5YTU0NjQwZjlkNjM5MjdhNTU2ZWNmMGJiOGJiMCIsInN1YiI6IjY1NGI1NzVhMjg2NmZhMDExYmQxNWFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IVe2c3u7HpKmqFrIwIh-Tra8FKE8-G6hR-M6WrXJ69Q'
  _apiKey = 'e629a54640f9d63927a556ecf0bb8bb0'

  getOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  };

  async getResource(url, options) {
    const res = await fetch(url, options);
    const body = await res.json()
    if (!res.ok) {
      throw new Error(res.status)
    }
    // if(body.results.length === 0 || body.genres.length === 0) {
    //   throw new Error(res.status)
    // }
    return body
  };

  async getMovies(requestValue, page) {
    const pageNum = page || 1
    const res = await this.getResource(`${this._apiBase}/search/movie?api_key=${this._apiKey}&query=${requestValue}&include_adult=false&language=en-US&page=${pageNum}`, this.getOptions)
    const totalPages = res.total_pages
    const basePage = res.page
    const movies = res.results.map(this.__transformMovieResults)
    return ({ movies, totalPages, basePage })
  };

  async getGenresData() {
    const res = await this.getResource(`${this._apiBase}/genre/movie/list?api_key=${this._apiKey}&language=en`, this.getOptions)
    return res.genres
  };

  async createGuestSession() {
    const res = await this.getResource(`${this._apiBase}/authentication/guest_session/new?api_key=${this._apiKey}`, this.getOptions)
    return res.guest_session_id
  };

  async getMyRatedFilms(sessionId, page) {
    const pageNum = page || 1
    const res = await this.getResource(
      `${this._apiBase}/guest_session/${sessionId}/rated/movies?api_key=${this._apiKey}&language=en-US&page=${pageNum}&sort_by=created_at.asc`,
      this.getOptions)
    const totalPages = res.total_pages
    const ratedPage = res.page
    const ratedMovies = res.results.map(this.__transformMovieResults)
    return ({ totalPages, ratedMovies, ratedPage })
  };

  async postRatedMovie(movieId, sessionId, value) {
    const res = await fetch(
      `${this._apiBase}/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ value: value })
      }
    )
    return res
  };

  __transformMovieResults(movie) {
    return {
      id: movie.id,
      title: movie.title,
      date: movie.release_date,
      overview: movie.overview,
      poster: movie.poster_path,
      rating: movie.vote_average,
      myRating: movie.rating || 0,
      genreIdsArr: movie.genre_ids
    }
  };
};
