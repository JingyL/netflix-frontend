import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

const base_URL = "https://api.themoviedb.org/3";
const trending = `/trending/all/week?api_key=${API_KEY}&language=en-US`;
const netflix_originals = `/discover/tv?api_key=${API_KEY}&with_networds=213`;
const top_rated = `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
// const action_movies =`/discover/tv?api_key=${API_KEY}&with_genres=28`;
const comedy_movies = `/discover/tv?api_key=${API_KEY}&with_genres=35`;
// const horror_movies = `/discover/tv?api_key=${API_KEY}&with_genres=27`;
const romantic_movies = `/discover/tv?api_key=${API_KEY}&with_genres=10749`;
const documentaries = `/discover/tv?api_key=${API_KEY}&with_genres=99`;

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class NetflixApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${NetflixApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }


  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }


  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async changeProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async addToMovieList(username, movie_name, movie_id) {
    console.log("verifyname", movie_name)
    let res = await this.request(`users/${username}/${movie_name}/${movie_id}/add`, {}, "post");
    console.log("verifyres", res)
    return res["added"];
  }

  static async removeFromMovieList(username, movie_name, movie_id) {
    let res = await this.request(`users/${username}/${movie_name}/${movie_id}/remove`, {}, "post");
    return res["removed"];
  }

  static async getTrending() {
    let res = await axios.get(`${base_URL}${trending}`)
    console.log(res)
    return res;
  }

  static async getNetflixOriginals() {
    let res = await axios.get(`${base_URL}${netflix_originals}`)
    return res;
  }

  static async getTopRated() {
    let res = await axios.get(`${base_URL}${top_rated}`)
    return res;
  }

  // static async getActionMovies() {
  //   let res = await axios.get(`${base_URL}${action_movies}`)
  //   return res;
  // }

  static async getComedyMovies() {
    let res = await axios.get(`${base_URL}${comedy_movies}`)
    return res;
  }

  // static async getHorrorMovies() {
  //   let res = await axios.get(`${base_URL}${horror_movies}`)
  //   return res;
  // }

  static async getRomanticMovies() {
    let res = await axios.get(`${base_URL}${romantic_movies}`)
    return res;
  }

  static async getDocumentaries() {
    let res = await axios.get(`${base_URL}${documentaries}`)
    return res;
  }

  // static async getUpcoming() {
  //   let res = await axios.get(`${base_URL}${upcoming}`)
  //   return res;
  // } 


  static async search(data) {
    let all_movies = [];
    for (let i = 0; i < data.length; i++) {
      let id = data[i][0];
      let res = await axios.get(`${base_URL}/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`, { params: { query: data[i][1] } })
      if (NetflixApi.verifyID(res.data.results, id)) {
        all_movies.push(NetflixApi.verifyID(res.data.results, id));
      }
    }
    return all_movies;
  }

  static verifyID(movies, id) {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i]["id"] === id) {
        return movies[i];
      }
    }
    return null;
  }


  static async searchMovie(data) {
    let res = await axios.get(`${base_URL}/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`, { params: { id: data[0], query: data[1] } })
    for (let i = 0; i < res.data.results.length; i++) {
      let movie_name = res.data.results[i].name || res.data.results[i].title
      if (movie_name === data[1]) {
        return res.data.results[i];
      }
    }
    return res.data.results;
  }


  static async searchTVMovie(keyword) {
    let res = await axios.get(`${base_URL}/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`, { params: { query: keyword } })
    // for (let i = 0; i < res.data.results.length; i++){
    //   let movie_name = res.data.results[i].name || res.data.results[i].title
    //   if (movie_name === data[1]){
    //     return res.data.results[i];
    //   }
    // }
    return res.data.results;
  }

  // static verifyMovie(name){

  // }

}


NetflixApi.token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzllNzhiNDA2Njc4MjQxZWVjYzVjMTY5M2Q4ZjUwMiIsInN1YiI6IjYyNzk0YzhlMjNkMjc4MDA1MDkxNjdjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CsuC2gL6xqhtvVw8bSqI7jFIcxTdXlydoZxndpt-mwk";


export default NetflixApi;