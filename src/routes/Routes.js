import { Redirect, Route, Switch } from "react-router-dom";
import NetflixApi from "../api/Api";
import Homepage from "../components/Homepage";
import MovieSection from "../components/movies/MovieSection";
import Banner from "../components/navbar/Banner";
import Navbar from "../components/navbar/Navbar";
import SearchTM from "../components/search/SearchTM";
import MovieList from "../components/users/MovieList";
import Profile from "../components/users/Profile";
import SignIn from "../components/users/SignIn";
import SignUp from "../components/users/SignUp";
import PrivateRoute from "./PrivateRoute";

function Routes({ login, signup, logout, addToMovieList, removeFromMovieList, changeProfile }) {

  return (
    <Switch>
      <PrivateRoute exact path="/movies">Ï
        <Navbar logout={logout}></Navbar>
        <Banner fetchData={NetflixApi.getNetflixOriginals} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList}></Banner>

        <MovieSection title="NETFLIX ORIGINALS" fetchData={NetflixApi.getNetflixOriginals} isLargeRow={true} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList}></MovieSection>
        <MovieSection title="Trending Now" fetchData={NetflixApi.getTrending} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList}></MovieSection>
        <MovieSection title="Top Rated" fetchData={NetflixApi.getTopRated} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList}></MovieSection>
        <MovieSection title="Comedy Movies" fetchData={NetflixApi.getComedyMovies} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList}></MovieSection>
        <MovieSection title="Romantic Movies" fetchData={NetflixApi.getRomanticMovies} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList}></MovieSection>
        <MovieSection title="Documentaries" fetchData={NetflixApi.getDocumentaries} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList}></MovieSection>
      </PrivateRoute>

      <PrivateRoute exact path="/search">
        <SearchTM fetchData={NetflixApi.getNetflixOriginals} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList}></SearchTM>
      </PrivateRoute>

      <PrivateRoute exact path="/mylist">
        <MovieList fetchData={NetflixApi.search} addToMovieList={addToMovieList} removeFromMovieList={removeFromMovieList}></MovieList>
      </PrivateRoute>

      <PrivateRoute exact path="/profile">
        <Profile changeProfile={changeProfile}></Profile>
      </PrivateRoute>

      <Route exact path="/">
        <Homepage login={login}></Homepage>
      </Route>

      <Route exact path="/signin">
        <SignIn login={login}></SignIn>
      </Route>
      <Route exact path="/signup">
        <SignUp signup={signup}></SignUp>
      </Route>
      <Redirect to="/movies" />
    </Switch>
  )
}

export default Routes;