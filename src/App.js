import './App.css';
import MovieSection from './components/movies/MovieSection';
import NetflixApi from './api/Api';
import Navbar from './components/navbar/Navbar';
import Banner from './components/navbar/Banner';

function App() {
  console.log(process.env.API_KEY)
  return (
    <div className="App">

      <Navbar></Navbar>
      <Banner fetchData={NetflixApi.getNetflixOriginals} ></Banner>

     <MovieSection title="NETFLIX ORIGINALS" fetchData={NetflixApi.getNetflixOriginals} isLargeRow={true}></MovieSection>
     <MovieSection title="Trending Now" fetchData={NetflixApi.getTrending}></MovieSection>
     <MovieSection title="Top Rated" fetchData={NetflixApi.getTopRated}></MovieSection>
     <MovieSection title="Action Movies" fetchData={NetflixApi.getActionMovies}></MovieSection>
     {/* <MovieSection title="Comedy Movies" fetchData={NetflixApi.getComedyMovies}></MovieSection>
     <MovieSection title="Horror Movies" fetchData={NetflixApi.getHorrorMovies}></MovieSection> */}
     <MovieSection title="Romantic Movies" fetchData={NetflixApi.getRomanticMovies}></MovieSection>
     <MovieSection title="Documentaries" fetchData={NetflixApi.getDocumentaries}></MovieSection>
    </div>
  );
}

export default App;
