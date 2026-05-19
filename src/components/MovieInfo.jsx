import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/info-styles.css'

function MovieInfo() {
    const apiKey = import.meta.env.VITE_OMBD_API_KEY;

    const {title} = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://omdbapi.com/?apikey=${apiKey}&t=${title}`);
            const data = await res.json();

            setMovie(
                {
                    title: data.Title,
                    poster: data.Poster,
                    plot: data.Plot,
                    release_date: data.Released,
                    rated: data.Rated,
                    reviews: data.Ratings,
                }
            );
        }

        fetchData();
    }, [title])

    return (
        <>
            <div className="center-container">
                <h1>{movie.title}</h1>
            </div>

            <div id="info-container">
                <img
                    src={movie.poster}
                    alt={`Poster for the movie ${movie.title}`}
                />

                <ul>
                    <li>Plot: {movie.plot}</li>
                    <li>Release Date: {movie.release_date}</li>
                    <li>MPA Rating: {movie.rated}</li>
                    <li>Reviews:</li>
                    <ul>
                        {movie.reviews?.map(review => (
                            <li key={review.Source}>
                                {review.Source} - {review.Value}
                            </li>
                        ))}
                    </ul>
                </ul>
            </div>

            <div className="center-container">
                <Link to="/">
                    <button>Go Back</button>
                </Link>
            </div>
        </>
    )
}

export default MovieInfo
