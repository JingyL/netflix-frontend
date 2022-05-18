import React, { useContext, useEffect, useState }  from 'react';
import UserContext from '../../hooks/UserContext';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./MovieList.css"
import Navbar from '../navbar/Navbar';
import MovieCardForList from '../movies/MovieCardForList';
import NetflixApi from '../../api/Api';

function MovieList({fetchData, addToMovieList, isLargeRow, removeFromMovieList}) {
  const { addedMovies, setAddedMovies } = useContext(UserContext);
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")
  const [error, setError] = useState("")
  const [hide, setHide] = useState([true, 0])
  const [movieOverview, setMovieOverview] = useState("")

  console.log("movielist movies:", addedMovies)
  useEffect(() => {
    async function getData() {
      let res = await fetchData(addedMovies);
      setMovies(res);
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

  function handleClick(movie, id){
    setMovieOverview("");
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
    // Get Movie overview
    async function handleInfo(data){
      setTrailerUrl("")
      setError("");
      let res = await NetflixApi.searchMovie(data)
      setMovieOverview(res.overview)
   }

  return (
    <>
    <Navbar></Navbar>
    <div className="movieList">
      <h2>My List</h2>
      <div className="section-posters-list">
      {movies.map(m => (
        <MovieCardForList
          key={m.id}
          id={m.id}
          image={m.backdrop_path}
          name={m.name? m.name:m.title}
          isLargeRow={isLargeRow}
          handleClick={handleClick}
          showActions={showActions}
          hide={hide}
          id={m.id}
          addToMovieList={addToMovieList}
          removeFromMovieList={removeFromMovieList}
          handleInfo={handleInfo}
        />
      ))}
      </div>
        {trailerUrl && !error && !hide[0] && <>
        <YouTube videoId={trailerUrl} opts={opts}></YouTube>
        </>}
        {error && <>
        <p className="error-msg">{error}</p>
        </>}

        {movieOverview 
      ? <>
      <p className="overview">Overview: </p>
      <p className="overview">{movieOverview}</p>
      </>
    : <></>}
        
    </div>
    </>
  )
}

export default MovieList
