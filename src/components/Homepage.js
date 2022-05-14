import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../hooks/UserContext";
import Navbar from "./navbar/Navbar";
import SignIn from "./users/SignIn";

function Homepage({ login }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log("homepage", currentUser)
  return (
    <div className="Homepage">
      <div className="container text-center">
        {currentUser
          ? <Redirect to="/movies"></Redirect>
          : <>
            <Navbar></Navbar>
            <SignIn login={login}></SignIn>

          </>}
      </div>
    </div>

  );
}

export default Homepage
