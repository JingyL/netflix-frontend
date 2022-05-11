import React, { useEffect }  from 'react';
import { useState } from 'react';
import "./Banner.css";

function Banner({fetchData}) {
  const [movie, setMovie] = useState([])
  const [url, setUrl]= useState("")
  const [description, setDescription]= useState("")
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
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        <h1 className="banner-description">{description}</h1>
        </div>

        <div className="banner-fadebottom"></div>
      </header>
      
    </>
  )
}

export default Banner
