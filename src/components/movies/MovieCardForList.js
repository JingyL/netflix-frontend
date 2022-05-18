import React from 'react'
import MovieActionForList from './MovieActionForList';
import "./MovieCard.css"

const base_URL = "http://image.tmdb.org/t/p/original/";

function MovieCardForList({ id, image, name, isLargeRow, handleClick, showActions, hide, addToMovieList, removeFromMovieList, handleInfo }) {
  return (
    <div>
      {isLargeRow
        ?
        <>
          <img key={id} className="posters posters-larger" src={`${base_URL}${image}`} alt={name}
            onClick={() => showActions(id)}></img>
          {id === hide[1]
            ? <MovieActionForList key={id} id={id} name={name} handleClick={handleClick} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList} handleInfo={handleInfo}></MovieActionForList>
            : <></>}
        </>
        :
        <>
          <img key={id} className="posters" src={`${base_URL}${image}`} alt={name}
            onClick={() => showActions(id)}></img>
          {id === hide[1]
            ? <MovieActionForList key={id} id={id} name={name} handleClick={handleClick} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList} handleInfo={handleInfo}></MovieActionForList>
            : <></>}
        </>
      }

    </div>
  )
}

export default MovieCardForList
