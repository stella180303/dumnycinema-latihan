
import './App.css';
import {getMovieList, searchMovie} from './Api';
import {useEffect, useState} from 'react';
import Cinema from './img/Cinema_XXI.png'

const App = () =>  {


  const [popularMovies, setPopularMovies] = useState([])

  
  useEffect(() => {
   getMovieList().then((result) => {
    setPopularMovies(result)
   })
  }, [])


  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
          <div className="movie-wrapper" key={i}>
            
                <img className="movie-image"src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
                <div className='text'>
                <div className="movie-title">{movie.title}</div>
                <div className="movie-date">Release : {movie.release_date}</div>
                <div className="movie-rate">Rate    : {movie.vote_average}</div>
                </div>      
          </div>
      )
    })
  }
  
  const search = async (q) => {
     if(q.length > 3){
      const cari = await searchMovie(q)
      setPopularMovies(cari.results)
     }
     
  }
  
  console.log({popularMovies : popularMovies})


  return (
    <div className="">
      <header className="App header">
          <div>
            <img src={Cinema} className='logocinema' />

            <input placeholder="Cari film kesayangan anda.." className="Movie-search" onChange={({target})=>search(target.value)}
            />
          </div>
      </header>

      <div className="movie-container">
            <PopularMovieList />
      </div>
        
    </div>
  );
}

export default App;
