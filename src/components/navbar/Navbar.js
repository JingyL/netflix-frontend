import React,  { useContext}  from 'react';
import "./Navbar.css";
import UserContext from "../../hooks/UserContext";
import { Link, NavLink } from 'react-router-dom';

function Navbar({ logout }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);


  return (
    <>
      {currentUser
        ? <>
          <div className="nav">
          <NavLink to="/movies" className="nav-logo"><img className="nav-logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo"></img></NavLink>
            <h3 className="nav-text">TV Shows</h3>
            <h3 className="nav-text">Movies</h3>
            <NavLink to="/movies/list" style={{ textDecoration: 'none' }}><h3 className="nav-text">My List</h3></NavLink>
            <img className="nav-avatar" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Netflix Avatar"></img>
            <NavLink to="/"  className="nav-avatar" style={{ textDecoration: 'none' }} onClick={logout}>Sign Out</NavLink>
          </div>
        </>
        : <><div className="nav-no-user">
            <img className="nav-logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo"></img>

          </div></>
      }
    </>
  )
}

export default Navbar
