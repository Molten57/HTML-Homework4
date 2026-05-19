import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import '../styles/list-styles.css'
import '../styles/styles.css'

function MovieList() {
    const apiKey = import.meta.env.VITE_OMBD_API_KEY;

    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])

    const handleSearch = () => {
        const search = document.getElementById('search').value;

        if (search.length > 0) {
            setSearch(search);
        }
    }

    useEffect(() => {
        const fetchMovies = async () => {
            setMovies([]);

            const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&type=movie`);
            const data = await res.json();

            if (data.Response === "True") {
                const movies = [];

                data.Search.forEach(movie => {
                    movies.push({ title: movie.Title, poster: movie.Poster });
                })

                setMovies(movies);
            }
        }

        fetchMovies()
    }, [search])

    return (
        <>
            <div id='input-container'>
                <h1>Welcome to the Movie Database!</h1>
                <input
                    id="search"
                    type={"text"}
                    placeholder={"Search for a movie..."}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className='center-container' id='movie-container'>
                {movies.map((movie, index) => {
                    return (
                        <Link to={`movie/${movie.title}`} key={index}>
                            <div className="center-container movie" key={index}>
                                <h2>{movie.title}</h2>
                                <img
                                    src={movie.poster}
                                    alt={`Poster for the movie ${movie.title}`}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    )
}

export default MovieList
