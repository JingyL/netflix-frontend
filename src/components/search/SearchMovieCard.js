import React, { useContext, useState } from 'react'
import UserContext from '../../hooks/UserContext';
import MovieAction from '../movies/MovieAction';
import "./SearchMovieCard.css"

const base_URL = "http://image.tmdb.org/t/p/original/";

function SearchMovieCard({ id, image, name, hide, showActions, handleClick, addToMovieList, handleInfo, removeFromMovieList}) {
  return (
    <div>
      <div className="search-movie-card" onClick={()=>showActions(id)}>
        <h3 className="movie-text">{name}</h3>
        {/* <h4 className="movie-overview">{overview}</h4> */}
        <img className="float-right ml-5"  key={id} className="posters" src={`${base_URL}${image}`} alt={name}></img>
      </div>
      {id === hide[1]
            ? <MovieAction key={id} id={id} name={name} handleClick={handleClick} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList} handleInfo={handleInfo}></MovieAction>
            : <></>}


    </div>
  )
}

export default SearchMovieCard
