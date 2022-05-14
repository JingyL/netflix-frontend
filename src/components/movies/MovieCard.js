import React, { useState } from 'react'
import MovieAction from './MovieAction';
import "./MovieCard.css"
const base_URL = "http://image.tmdb.org/t/p/original/";

function MovieCard({ id, image, name, isLargeRow, handleClick, showActions, hide, addToMovieList }) {
  return (
    <div>
      {isLargeRow
        ?
        <>
          <img key={id} className="posters posters-larger" src={`${base_URL}${image}`} alt={name}
            onClick={()=>showActions(id)}></img>
          {id === hide[1]
            ? <MovieAction key={id} id={id} name={name} handleClick={handleClick} addToMovieList={addToMovieList}></MovieAction>
            : <></>}
        </>
        :
        <>
          <img key={id} className="posters" src={`${base_URL}${image}`} alt={name}
      onClick={()=>showActions(id)}></img>
          {id === hide[1]
            ? <MovieAction key={id} id={id} name={name} handleClick={handleClick} addToMovieList={addToMovieList}></MovieAction>
            : <></>}
        </>
      }

    </div>
  )
}

export default MovieCard
