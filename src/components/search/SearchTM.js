import React, { useEffect, useState } from 'react'
import NetflixApi from '../../api/Api';
import Navbar from '../navbar/Navbar'
import SearchForm from './SearchForm';
import SearchMovieCard from './SearchMovieCard';
import "./SearchTM.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";


function SearchTM({ fetchData, addToMovieList, removeFromMovieList }) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")
  const [error, setError] = useState("")
  const [hide, setHide] = useState([true, 0])
  const [movieOverview, setMovieOverview] = useState("")

  useEffect(() => {
    async function getData() {
      let res = await fetchData();
      setMovies(res.data.results);
    }
    getData();
  }, [fetchData]);

  async function searchTVMovie(keyword) {
    let movies = await NetflixApi.searchTVMovie(keyword);
    console.log(movies)
    setMovies(movies);

  }


  // Movie play function && helper function to split movie name
  function handleClick(movie) {
    setMovieOverview("")
    if (trailerUrl || error) {
      setTrailerUrl("")
      setError("")
    } else {
      movieTrailer(movie)
        .then((url => {
          console.log("url", url)
          if (!url) {
            let movie_name = splitMoivieName(movie)
            setError(`Link cannot find, please reach to https://www.themoviedb.org/search?query=${movie_name}`)
          }
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"))
        }))
    }
  }

  console.log(trailerUrl, hide, error)
  function splitMoivieName(name) {
    let arr = name.split(" ")
    return arr.join("%")
  }


  // function to show play, add, remove icons under the poster image
  function showActions(id) {
    if (hide[0]) {
      setHide([false, id]);
    } else {
      setHide([true, 0]);
      setTrailerUrl("");
      setError("");
      setMovieOverview("")
    }

  }

  // Get Movie overview
  async function handleInfo(data) {
    setTrailerUrl("")
    setError("");
    let res = await NetflixApi.searchMovie(data)
    setMovieOverview(res.overview)
  }
  console.log(movieOverview)



  return (
    <div className="searchTM">
      <Navbar></Navbar>
      <SearchForm searchFor={searchTVMovie}></SearchForm>
      {movies.map(m => (
        <>
          <SearchMovieCard
            key={m.id}
            image={m.poster_path}
            name={m.name ? m.name : m.title}
            id={m.id}
            handleClick={handleClick}
            showActions={showActions}
            hide={hide}
            addToMovieList={addToMovieList}
            handleInfo={handleInfo}
            removeFromMovieList={removeFromMovieList}
            trailerUrl={trailerUrl}
            error={error}
            movieOverview={movieOverview}
          />
        </>
      ))}

 
    </div>
  )
}

export default SearchTM
