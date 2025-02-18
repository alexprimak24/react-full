import React from "react";
import WatchedMovie from "./WatchedMovie";
import { WatchedMovieProps } from "../../App";

interface WatchedListProps {
  watched: WatchedMovieProps[];
  onDeleteWatched: (id: string) => void;
}

function WatchedList({ watched, onDeleteWatched }: WatchedListProps) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie
          key={`${movie.title}${movie.director}`}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

export default WatchedList;
