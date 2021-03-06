import React, { useContext, useState } from 'react'
import "./MovieAction.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus, faMinus, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import UserContext from '../../hooks/UserContext'


function MovieAction({ id, name, handleClick, addToMovieList, removeFromMovieList, handleInfo }) {
  const { addedMovies, setAddedMovies } = useContext(UserContext);
  const [addErrorMsg, setAddErrorMsg] = useState("");
  const [addSuccessMsg, setAddSuccessMsg] = useState("");
  const [removeErorMsg, setRemoveErorMsg] = useState("");
  const [removeSuccessMsg, setRemoveSuccessMsg] = useState("");
 
  async function handleAdd(e) {
    e.preventDefault();
    setRemoveSuccessMsg("");
    setRemoveErorMsg(""); 
    setAddSuccessMsg("")
    setAddErrorMsg("");
    let response = await addToMovieList(name, id);
    if (response["success"]) {
      setAddSuccessMsg(response["success"])
    } else {
      setAddErrorMsg(response.error);
    }
  }

  async function handleRemove(e) {
    e.preventDefault();
    setRemoveSuccessMsg("");
    setRemoveErorMsg(""); 
    setAddSuccessMsg("")
    setAddErrorMsg("");
    let response = await removeFromMovieList(name, id);
    if (response["success"]) {
      setRemoveSuccessMsg(response["success"]);
    } else {
      setRemoveErorMsg(response["error"]);
    }
  }



  return (
    <div className="movie-action">

      <FontAwesomeIcon className="icon" icon={faPlay} onClick={() => handleClick(name)} />
      {
        JSON.stringify(addedMovies).indexOf(JSON.stringify([id, name])) > -1 || addSuccessMsg
          ? <FontAwesomeIcon className="icon" icon={faMinus} onClick={handleRemove} />
          : <FontAwesomeIcon className="icon" icon={faPlus} onClick={handleAdd} />

      }
 <FontAwesomeIcon className="icon" icon={faCircleInfo} onClick={()=> handleInfo([id, name])} />
      {JSON.stringify(addedMovies).indexOf(JSON.stringify([id, name])) > -1 || addErrorMsg
      ? <p style={{color:'white'}}>{addErrorMsg}</p>
      : <></>
      }




    </div>
  )
}

export default MovieAction;
