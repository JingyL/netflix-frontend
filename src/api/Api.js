import axios from "axios";
const API_KEY = "6c9e78b406678241eecc5c1693d8f502";

const base_URL = "https://api.themoviedb.org/3";
const trending = `/trending/all/day?api_key=${API_KEY}&language=en-US`;
const netflix_originals =`/discover/tv?api_key=${API_KEY}&with_networds=213`;
const top_rated = `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const action_movies =`/discover/tv?api_key=${API_KEY}&with_genres=28`;
const comedy_movies = `/discover/tv?api_key=${API_KEY}&with_genres=35`;
const horror_movies = `/discover/tv?api_key=${API_KEY}&with_genres=27`;
const romantic_movies = `/discover/tv?api_key=${API_KEY}&with_genres=10749`;
const documentaries = `/discover/tv?api_key=${API_KEY}&with_genres=99`;

class NetflixApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async getTrending() {
    let res = await axios.get(`${base_URL}${trending}`)
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

  static async getActionMovies() {
    let res = await axios.get(`${base_URL}${comedy_movies}`)
    return res;
  }

  static async getComedyMovies() {
    let res = await axios.get(`${base_URL}${action_movies}`)
    return res;
  }

  static async getHorrorMovies() {
    let res = await axios.get(`${base_URL}${horror_movies}`)
    return res;
  }

  static async getRomanticMovies() {
    let res = await axios.get(`${base_URL}${romantic_movies}`)
    return res;
  }  

  static async getDocumentaries() {
    let res = await axios.get(`${base_URL}${documentaries}`)
    return res;
  }  
}


NetflixApi.token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzllNzhiNDA2Njc4MjQxZWVjYzVjMTY5M2Q4ZjUwMiIsInN1YiI6IjYyNzk0YzhlMjNkMjc4MDA1MDkxNjdjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CsuC2gL6xqhtvVw8bSqI7jFIcxTdXlydoZxndpt-mwk";


export default NetflixApi;