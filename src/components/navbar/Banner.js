import React, { useEffect }  from 'react';
import { useState } from 'react';
import "./Banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Banner({fetchData}) {
  const [movie, setMovie] = useState([])
  const [url, setUrl]= useState("")
  const [description, setDescription]= useState("")
  const [trailerUrl, setTrailerUrl] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    async function getData() {
      let res = await fetchData();
      console.log(res.data.results[Math.floor(Math.random()*(res.data.results.length-1))])
      let random_movie = res.data.results[Math.floor(Math.random()*(res.data.results.length-1))];
      setMovie(random_movie);
      setUrl(random_movie.backdrop_path);
      setDescription(truncateString(random_movie.overview, 150))
    }
    getData();
  }, [fetchData]);

  function truncateString(str, num) {
    console.log(str)
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
          <button className="banner-button">My List</button>
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
