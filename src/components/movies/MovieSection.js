import React, { useEffect } from 'react';
import { useState } from 'react';
import MovieCard from './MovieCard';
import "./MovieSection.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_URL = "http://image.tmdb.org/t/p/original/";

function MovieSection({title, fetchData, isLargeRow}) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    async function getData() {
      let res = await fetchData();
      console.log(res.data.results)
      setMovies(res.data.results);
    }
    getData();
  }, [fetchData]);
  
  if (movies.length == 0) {
    return <p className="loading">Loading &hellip;</p>;
  }

  const opts ={
    height:"390",
    width:"100%",
    playerVars:{
      autoplay: 1,
    }
  }

  function handleClick(movie, id){
    if (trailerUrl || error){
      setTrailerUrl("")
      setError("")
    }else{
      movieTrailer(movie, { tmdbId: id})
      .then((url=>{
        if (!url){
          let movie_name = splitMoivieName(movie)
          setError(`Link cannot find, please reach to https://www.themoviedb.org/search?query=${movie_name}`)
          console.log(movie_name)
        }
        const urlParams = new URLSearchParams(new URL(url).search);
        console.log(urlParams)
        setTrailerUrl(urlParams.get("v"))
      }))
    }
  }

  function splitMoivieName(name){
    let arr = name.split(" ")
    return arr.join("%")
  }


  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="section-posters">
      {movies.map(m => (
        <MovieCard
          key={m.id}
          image={isLargeRow? m.poster_path : m.backdrop_path}
          name={m.name}
          isLargeRow={isLargeRow}
          handleClick={handleClick}
        />
      ))}
      </div>
        {trailerUrl && !error && <>
        <YouTube videoId={trailerUrl} opts={opts}></YouTube>
        <button>Add to MovieLists</button>
        </>}
        {error && <>
        <p className="error-msg">{error}</p>
         <button>Add to MovieLists</button>
        </>}
        
    </div>
  )
}

export default MovieSection
