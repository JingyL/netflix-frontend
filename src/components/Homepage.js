import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../hooks/UserContext";


function Homepage() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div className="Homepage">
      <div className="container text-center">
        {currentUser
          ? <Redirect to="/movies"></Redirect>
          : <>
            <Redirect to="/signin"></Redirect>
          </>}
      </div>
    </div>

  );
}

export default Homepage
