import React, { useEffect } from 'react';
import { useState } from 'react';
import MovieCard from './MovieCard';
import "./MovieSection.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";


const base_URL = "http://image.tmdb.org/t/p/original/";

function MovieSection({title, fetchData, isLargeRow, addToMovieList}) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")
  const [error, setError] = useState("")
  const [hide, setHide] = useState([true, 0])

// Load movies data based on it's section
  useEffect(() => {
    async function getData() {
      let res = await fetchData();
      setMovies(res.data.results);
    }
    getData();
  }, [fetchData]);

  const opts ={
    height:"390",
    width:"100%",
    playerVars:{
      autoplay: 1,
    }
  }

// Movie play function && helper function to split movie name
  function handleClick(movie){
console.log(movie)
    if (trailerUrl || error){
      setTrailerUrl("")
      setError("")
    }else{
      movieTrailer(movie)
      .then((url=>{
        console.log("url", url)
        if (!url){
          let movie_name = splitMoivieName(movie)
          setError(`Link cannot find, please reach to https://www.themoviedb.org/search?query=${movie_name}`)
        }
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"))
      }))
    }
  }

  function splitMoivieName(name){
    let arr = name.split(" ")
    return arr.join("%")
  }


  // function to show play, add, remove icons under the poster image
  function showActions(id) {
    if (hide[0]){
      setHide([false, id]);
    }else{
      setHide([true, 0]);
      setTrailerUrl("");
      setError("");
    }

  }

  //  if movies are not finished loading, show "loading"
  if (movies.length == 0) {
    return <p className="loading">Loading &hellip;</p>;
  }

  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="section-posters">
      {movies.map(m => (
        <>
        <MovieCard
          key={m.id}
          image={isLargeRow? m.poster_path : m.backdrop_path}
          name={m.name}
          isLargeRow={isLargeRow}
          handleClick={handleClick}
          showActions={showActions}
          hide={hide}
          id={m.id}
          addToMovieList={addToMovieList}
        />
        </>
      ))}
      </div>
        {trailerUrl && !error && !hide[0] && <>
        <YouTube videoId={trailerUrl} opts={opts}></YouTube>
        </>}
        {error && !hide[0] && <>
        <p className="error-msg">{error}</p>
        </>}
        
    </div>
  )
}

export default MovieSection
