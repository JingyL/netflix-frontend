import { Redirect, Route, Switch } from "react-router-dom";
import NetflixApi from "../api/Api";
import Homepage from "../components/Homepage";
import MovieSection from "../components/movies/MovieSection";
import Banner from "../components/navbar/Banner";
import Navbar from "../components/navbar/Navbar";
import MovieList from "../components/users/MovieList";
import SignIn from "../components/users/SignIn";
import SignUp from "../components/users/SignUp";

import PrivateRoute from "./PrivateRoute";

function Routes({ login, signup, logout, addToMovieList}) {

  return (
    <Switch>
      <PrivateRoute exact path="/movies">Ï
        <Navbar logout={logout}></Navbar>
        <Banner fetchData={NetflixApi.getNetflixOriginals} addToMovieList={addToMovieList}></Banner>

        <MovieSection title="NETFLIX ORIGINALS" fetchData={NetflixApi.getNetflixOriginals} isLargeRow={true} addToMovieList={addToMovieList}></MovieSection>
        <MovieSection title="Trending Now" fetchData={NetflixApi.getTrending} addToMovieList={addToMovieList}></MovieSection>
        <MovieSection title="Top Rated" fetchData={NetflixApi.getTopRated} addToMovieList={addToMovieList}></MovieSection>
        <MovieSection title="Action Movies" fetchData={NetflixApi.getActionMovies} addToMovieList={addToMovieList}></MovieSection>
        {/* <MovieSection title="Comedy Movies" fetchData={NetflixApi.getComedyMovies}></MovieSection>
     <MovieSection title="Horror Movies" fetchData={NetflixApi.getHorrorMovies}></MovieSection> */}
        <MovieSection title="Romantic Movies" fetchData={NetflixApi.getRomanticMovies} addToMovieList={addToMovieList}></MovieSection>
        <MovieSection title="Documentaries" fetchData={NetflixApi.getDocumentaries} addToMovieList={addToMovieList}></MovieSection>
      </PrivateRoute>

      <PrivateRoute exact path="/movies/list">
        <MovieList fetchData={NetflixApi.search} addToMovieList={addToMovieList}></MovieList>
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
      <Redirect to="/signin" />
    </Switch>
  )
}

export default Routes;