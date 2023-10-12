import './App.css';
import {getMovieList, searchMovie} from "./api"
import {useEffect, useState} from 'react';

const App = () => {

  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => 
    {setPopularMovies(result)})
  }, [])

  console.log(popularMovies)

  const search = async (q) => {
    if (q.length > 3){
    const querry = await searchMovie(q)
    setPopularMovies(querry.results)
    // console.log({querry : querry})
    }
  }

  const PopularMovieList = () =>{
    const imgurl = 'https://image.tmdb.org/t/p/w100'
    return popularMovies.map((movie, i) => {
      return(
        <div className="movie-wrapper" key={i}>
            <div className="movie-tittle">{movie.title}</div>
            <img className="movie-img" alt="gagal" src={`${process.env.REACT_APP_IMG}/${movie.poster_path}`}
            />
            <div className="movie-date">Release : {movie.release_date}</div>
            <div className="movie-rate">{movie.vote_average}</div>
        </div>
      )
      
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>GIPARI FILM</h1>
        <input 
        placeholder='Cari Film....' 
        className='movie-search'
        onChange={({target}) => search(target.value)}
        />
        <div className="movie-container">
          <PopularMovieList/>
        </div>
      </header>
    </div>
  );
}

export default App;
