import React from "react";
import WatchedMovie from "./WatchedMovie";

interface WatchedListProps {
  watched: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    runtime: number;
    imdbRating: number;
    userRating: number;
  }[];
}

function WatchedList({ watched }: WatchedListProps) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie key={movie.Title} movie={movie} />
      ))}
    </ul>
  );
}

export default WatchedList;
