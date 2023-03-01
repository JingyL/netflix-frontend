import React, { useContext, useState } from 'react'
import "./MovieAction.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus, faMinus, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import UserContext from '../../hooks/UserContext'

function MovieActionForList({ id, name, handleClick, addToMovieList, removeFromMovieList, handleInfo }) {
  const { addedMovies, setAddedMovies } = useContext(UserContext);
  const [addErrorMsg, setAddErrorMsg] = useState("");
  const [addSuccessMsg, setAddSuccessMsg] = useState("");
  const [removeErorMsg, setRemoveErorMsg] = useState("");
  const [removeSuccessMsg, setRemoveSuccessMsg] = useState("");

  function refreshPage() {
    window.location.reload(false);
  }

  async function handleRemove(e) {
    e.preventDefault();
    setRemoveSuccessMsg("");
    setRemoveErorMsg("");
    let response = await removeFromMovieList(name, id);
    console.log(response)
    if (response["success"]) {
      setRemoveSuccessMsg(response["success"]);
      refreshPage();
    } else {
      setRemoveErorMsg(response["error"]);
    }
  }



  return (
    <div className="movie-action">

      <FontAwesomeIcon className="icon" icon={faPlay} onClick={() => handleClick(name)} />
      {/* {
        JSON.stringify(addedMovies).indexOf(JSON.stringify([id, name])) > -1 || addSuccessMsg
          ? <FontAwesomeIcon className="icon" icon={faMinus} onClick={handleRemove} />
          : <FontAwesomeIcon className="icon" icon={faPlus} />

      } */}
      <FontAwesomeIcon className="icon" icon={faMinus} onClick={handleRemove} />
      <FontAwesomeIcon className="icon" icon={faCircleInfo} onClick={() => handleInfo([id, name])} />
      {JSON.stringify(addedMovies).indexOf(JSON.stringify([id, name])) > -1 || addErrorMsg
        ? <p style={{ color: 'white' }}>{addErrorMsg}</p>
        : <></>
      }

    </div>
  )
}

export default MovieActionForList;
