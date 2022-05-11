import React from 'react'
import "./MovieCard.css"
const base_URL = "http://image.tmdb.org/t/p/original/";

function MovieCard({ id, image, name, isLargeRow, handleClick}) {
  console.log(isLargeRow)
  return (
    <div>
      {isLargeRow
      ? <img key={id} className="posters posters-larger" src={`${base_URL}${image}`} alt={name}
      onClick={()=>handleClick(name, id)}></img> 
      : <img key={id} className="posters" src={`${base_URL}${image}`} alt={name}
      onClick={()=>handleClick(name, id)}></img> 
      }

    </div>
  )
}

export default MovieCard
