import React, { useContext, useEffect, useState }  from 'react';
import UserContext from '../../hooks/UserContext';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import MovieCard from '../movies/MovieCard';
import "./MovieList.css"
import Navbar from '../navbar/Navbar';

function MovieList({fetchData, addToMovieList, isLargeRow}) {
  const { addedMovies, setAddedMovies } = useContext(UserContext);
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")
  const [error, setError] = useState("")
  const [hide, setHide] = useState([true, 0])

  useEffect(() => {
    async function getData() {
      let res = await fetchData(addedMovies);
      setMovies(res);
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

  return (
    <>
    <Navbar></Navbar>
    <div className="movieList">
      <h2>My List</h2>
      <div className="section-posters-list">
      {movies.map(m => (
        <MovieCard
          key={m.id}
          id={m.id}
          image={m.backdrop_path}
          name={m.name}
          isLargeRow={isLargeRow}
          handleClick={handleClick}
          showActions={showActions}
          hide={hide}
          id={m.id}
          addToMovieList={addToMovieList}
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
    </>
  )
}

export default MovieList
