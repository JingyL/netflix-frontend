import React, { useContext, useEffect }  from 'react';
import { useState } from 'react';
import "./Banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import UserContext from '../../hooks/UserContext';

function Banner({fetchData, addToMovieList}) {
  const { addedMovies, setAddedMovies } = useContext(UserContext);
  const [movie, setMovie] = useState([])
  const [url, setUrl]= useState("")
  const [description, setDescription]= useState("")
  const [trailerUrl, setTrailerUrl] = useState("")
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getData() {
      let res = await fetchData();
      let random_movie = res.data.results[Math.floor(Math.random()*(res.data.results.length-1))];
      setMovie(random_movie);
      setUrl(random_movie.backdrop_path);
      setDescription(truncateString(random_movie.overview, 150))
    }
    getData();
  }, [fetchData]);


  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
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

  async function handleAdd(e) {
    e.preventDefault();
    let response = await addToMovieList(movie.name, movie.id);
    if (response["success"]) {
      setSuccessMsg(response["success"])
    } else {
      setErrorMsg(response.error);
    }
  }

  function splitMoivieName(name){
    let arr = name.split(" ")
    return arr.join("%")
  }
  
  console.log("banner", addedMovies, [movie.id, movie.name])

  return (
    <>
      <header className="banner"
      style={{
        backgroundSize:"cover",
        backgroundImage: `url("http://image.tmdb.org/t/p/original/${url}")`,
        backgroundPosition:"center center"
      }}>
        <div className="banner-contents">
        <h1 className="banner-title">{movie.name}</h1>
        <div className="banner-buttons">
          <button className="banner-button" onClick={()=>handleClick(movie.name, movie.id) }>Play</button>

          {
            JSON.stringify(addedMovies).indexOf(JSON.stringify([movie.id, movie.name]))  > -1 || successMsg
           ? <button className="banner-button-added">Added</button>
          : <button className="banner-button" onClick={handleAdd}> + My List</button>

          }
  
        </div>
        <h1 className="banner-description">{description}</h1>
        </div>

        <div className="banner-fadebottom"></div>
      </header>
      

        {trailerUrl && !error && <>
        <YouTube videoId={trailerUrl} opts={opts}></YouTube>
        <button>Add to MovieLists</button>
        </>}
        {error && <>
        <p className="error-msg">{error}</p>
         <button>Add to MovieLists</button>
        </>}
    </>
  )
}

export default Banner
