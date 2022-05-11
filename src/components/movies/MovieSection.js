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

  function handleClick(movie){
    if (trailerUrl){
      setTrailerUrl("")
    }else{
      console.log("@@@")
      console.log(movie)
      movieTrailer(movie || "")
      .then((url=>{
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"))
      }))
    }
  }
// why can't just pass movie here and use movie.poster_path in moviecard?
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
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
    </div>
  )
}

export default MovieSection
