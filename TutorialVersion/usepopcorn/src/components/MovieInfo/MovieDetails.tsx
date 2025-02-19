import React, { useEffect, useState } from "react";
import ErrorComponent from "../utils/ErrorComponent";
import { KEY } from "../utils/constants";
import Loader from "../utils/Loader";
import StartRating from "../StarRating/StarRating";
import { WatchedMovieProps } from "../../App";

export interface Movie {
  title: string;
  year: string;
  poster: string;
  runtime: number;
  plot: string;
  released: string;
  actors: string[];
  director: string;
  genre: string;
  imdbRating: number;
  imdbID: string;
}

interface MovieDetailsProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedMovieProps) => void;
  watched: WatchedMovieProps[];
}

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [userRating, setUserRating] = useState(0);
  // We can actually remove it and use !userRatedValue below
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const userRatedValue = watched.find((watch) => watch.imdbID === selectedId);
  //DO THAT IN YOUR PROJECTS :)
  // We can btw just destructure this way so we won't need to type movie?. everywhere
  // const {Title: title, Year: year, Poster: poster} = movie;

  // DO NOT DO THIS
  // It will not work as expected as value that useState holds is being set on the initial render, so even
  // if movie?.imdbRating > 8 indeed will be true, but on the render we can't check it, it will be false
  // const [isTop,setIsTop] = useState(movie?.imdbRating > 8)

  // If we really need that just use
  // const isTop = movie?.imdbRating > 8;
  // And its value will change each time the MovieDetails component will rerender

  function handleAdd() {
    if (movie) {
      const newWatchedMovie = {
        userRating: Number(userRating),
        ...movie,
      };
      onAddWatched(newWatchedMovie);
    }
  }
  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?i=${selectedId}&apikey=${KEY}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching Movie Info");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Info not found");
        setMovie({
          title: data.Title,
          year: data.Year,
          poster: data.Poster,
          // split to an array and the first value take as a runtime val
          runtime: Number(data.Runtime.split(" ").at(0)),
          plot: data.Plot,
          released: data.Released,
          actors: data.Actors,
          director: data.Director,
          genre: data.Genre,
          imdbRating: Number(data.imdbRating),
          imdbID: data.imdbID,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!movie) return;

    document.title = `Movie | ${movie.title}`;
    //Cleanup function
    return function () {
      document.title = "usePopcorn";
    };
  }, [movie]);

  //as it is also a side effect as we are directly manipulating dom, we need to wrap it into useEffect
  //without a cleanup function even if we close MovieDetails and open and close again, these eventListeners will just accumulate
  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    };

    document.addEventListener("keydown", callback);
    //SO REMEMBER TO ADD CLEANUP FUNCTIONS IN SUCH CASES
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  return (
    <div className='details'>
      <header>
        <button className='btn-back' onClick={onCloseMovie}>
          &larr;
        </button>
        {!isLoading && !error && (
          <>
            <img src={movie?.poster} alt={`Poster of ${movie?.title}`} />
            <div className='details-overview'>
              <h2>{movie?.title}</h2>
              <p>
                {movie?.released} &bull; {movie?.runtime}
              </p>
              <p>{movie?.genre}</p>
              <p>
                <span>🌟</span> {movie?.imdbRating}
              </p>
            </div>
          </>
        )}
      </header>

      <section>
        {!isLoading && !error && (
          <>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StartRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>
                  You already rated this movie with {userRatedValue?.userRating}{" "}
                  <span>🌟</span>
                </p>
              )}
            </div>
            <p>
              <em>{movie?.plot}</em>
            </p>
            <p>Starring {movie?.actors}</p>
            <p>Directed by {movie?.director}</p>
          </>
        )}
        {isLoading && <Loader />}
        {error && <ErrorComponent message={error} />}
      </section>
    </div>
  );
}

export default MovieDetails;
