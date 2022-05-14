import React, { useContext, useState } from 'react'
import "./MovieAction.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import UserContext from '../../hooks/UserContext'

function MovieAction({id, name, handleClick, addToMovieList}) {
  console.log("movieaction", name)
  const { addedMovies, setAddedMovies } = useContext(UserContext);
  // const [movie, setMovie] = useState([])
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleAdd(e) {
    e.preventDefault();
    let response = await addToMovieList(name, id);
    if (response["success"]) {
      setSuccessMsg(response["success"])
    } else {
      setErrorMsg(response.error);
    }
  }

  return (
    <div className="movie-action">
      <FontAwesomeIcon className="icon" icon={faPlay} onClick={()=>handleClick(name)}/>
      {/* <FontAwesomeIcon className="icon" icon={faPlus} onClick={handleAdd}/> */}


      {
            JSON.stringify(addedMovies).indexOf(JSON.stringify([id, name]))  > -1 || successMsg
           ?  <FontAwesomeIcon className="icon" icon={faMinus}/>
          :  <FontAwesomeIcon className="icon" icon={faPlus} onClick={handleAdd}/>

          }

    </div>
  )
}

export default MovieAction;
