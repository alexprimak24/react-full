import React from "react";
import Movie from "./Movie";

interface MovieListProps {
  movies: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  }[];
}

function MovieList({ movies }: MovieListProps) {
  return (
    <ul className='list'>
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default MovieList;
