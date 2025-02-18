import React from "react";
import { WatchedMovieProps as MovieProps } from "../../App";
interface WatchedMovieProps {
  movie: MovieProps;
  onDeleteWatched: (id: string) => void;
}

function WatchedMovie({ movie, onDeleteWatched }: WatchedMovieProps) {
  return (
    <li key={`${movie.title}${movie.director}`}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className='btn-delete'
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default WatchedMovie;
