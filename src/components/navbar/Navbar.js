import React,  { useContext}  from 'react';
import "./Navbar.css";
import UserContext from "../../hooks/UserContext";
import { NavLink } from 'react-router-dom';

function Navbar({ logout }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <>
      {currentUser
        ? <>
          <div className="nav">
          <NavLink to="/movies" className="nav-logo"><img className="nav-logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo"></img></NavLink>
          <NavLink to="/search" style={{ textDecoration: 'none' }}><h3 className="nav-text">Search</h3></NavLink>
            <NavLink to="/mylist" style={{ textDecoration: 'none' }}><h3 className="nav-text">My List</h3></NavLink>
            <NavLink to="/profile" style={{ textDecoration: 'none' }}><h3 className="nav-text">Profile</h3></NavLink>
            <NavLink to="/signin"  className="nav-text-signout" style={{ textDecoration: 'none' }} onClick={logout}><h3>Sign Out</h3></NavLink>
          </div>
        </>
        : <></>
      }
    </>
  )
}

export default Navbar
