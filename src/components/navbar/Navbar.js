import React from 'react';
import "./Navbar.css";

function Navbar() {
  return (
    <div className="nav">
      <img className="nav-logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo"></img>
      <h3 className="nav-text">TV Shows</h3>
      <h3 className="nav-text">Movies</h3>
      <h3 className="nav-text">My List</h3>
      <img className="nav-avatar" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Netflix Avatar"></img>
    </div>
  )
}

export default Navbar
