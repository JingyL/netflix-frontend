import './App.css';
import NetflixApi from './api/Api';
import React, { useEffect } from "react";
import { BrowserRouter, Redirect, useHistory } from "react-router-dom";
import Routes from './routes/Routes';
import jwt_decode from "jwt-decode";
import UserContext from "./hooks/UserContext";
import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("token");
  const [addedMovies, setAddedMovies] = useState([]);
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (currentUser){
        setInfoLoaded(true);
        return;
      }
      if (token) {
        await getUser(token);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function login(data) {
    try {
      let token = await NetflixApi.login(data);
      setToken(token);
      // get current user
      await getUser(token)
      return { "success": token };
      
    } catch (errors) {
      return { "error": errors };
    }
  }

  async function signup(data) {
    try {
      let token = await NetflixApi.signup(data);;
      setToken(token);

      // get current user
      await getUser(token)     
      return { "success": token };
      
    } catch (errors) {
      return { "error": errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function getUser(token){
    try {
      let { username } = jwt_decode(token);
      NetflixApi.token = token;
      let currentUser = await NetflixApi.getCurrentUser(username);
      setCurrentUser(currentUser);
      setAddedMovies(currentUser.movielist)
    } catch (err) {
      setCurrentUser(null);
    }
  }

  async function addToMovieList(movie_name, movie_id) {
    try {
      let res = await NetflixApi.addToMovieList(currentUser.username, movie_name, movie_id);
      setAddedMovies(f => ([...f, [parseInt(res.movie_id), res.movie_name]]));
      return { "success": "Added Successfuly!" }
    } catch (errors) {
      return { "error": errors };
    }
  }

  async function removeFromMovieList(movie_name, movie_id) {
    try {
      let res = await NetflixApi.removeFromMovieList(currentUser.username, movie_name, movie_id);
      setAddedMovies(addedMovies.filter(f => JSON.stringify(f).indexOf(JSON.stringify(movie_id)) < 1));
      return { "success": "removed Successfuly!" }
    } catch (errors) {
      return { "error": errors };
    }
  }

  async function changeProfile(username, data) {
    try {
      let user = await NetflixApi.changeProfile(username, data);
      setCurrentUser(user)
      return { "success": "Upload Successfuly!" };
    } catch (errors) {
      return { "error": errors };
    }
  }

  if (!infoLoaded) return <p>Loading</p>;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, addedMovies }}>
          <Routes login={login} signup={signup} logout={logout}
            addToMovieList={addToMovieList}
            removeFromMovieList={removeFromMovieList}
            changeProfile={changeProfile}
          ></Routes>
        </UserContext.Provider>

      </BrowserRouter>
    </div>
  );
}

export default App;
