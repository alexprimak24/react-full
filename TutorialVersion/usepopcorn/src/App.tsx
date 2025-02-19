import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import Search from "./components/NavBar/Search";
import NumResults from "./components/NavBar/NumResults";
import Box from "./components/Main/Box";
import MovieList from "./components/Main/MovieList";
import WatchedSummary from "./components/Main/WatchedSummary";
import WatchedList from "./components/Main/WatchedList";
import Loader from "./components/utils/Loader";
import ErrorComponent from "./components/utils/ErrorComponent";
import MovieDetails, { Movie } from "./components/MovieInfo/MovieDetails";
import { KEY } from "./components/utils/constants";

export interface WatchedMovieProps extends Movie {
  userRating: number;
}

export const average = (arr: number[]) =>
  arr.reduce((acc, cur, _i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // const [watched, setWatched] = useState<WatchedMovieProps[]>([]);
  // We can set the state with function like that
  // Just remember FUNCTION HAVE TO BE PURE AND CANT RECEIVE ARGS
  // Pass the function that React can call later, do not call function inside useState
  const [watched, setWatched] = useState<WatchedMovieProps[]>(() => {
    try {
      const storedValue = localStorage.getItem("watched");
      return JSON.parse(storedValue || "[]");
    } catch (error) {
      console.error("Error parsing watched movies: ", error);
      return [];
    }
  });

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: WatchedMovieProps) {
    setWatched((watched) => [...watched, movie]);
    handleCloseMovie();
    //I wanted to do something like that to implement logic on userAlreadyRate, but in tutorial he did a bit different so just leave it here
    // const isAlreadyRated = watched.some(
    //   (watchedMovie) => watchedMovie.title === movie.title
    // );

    // if (!isAlreadyRated) {
    //   setWatched((watched) => [...watched, movie]);
    //   handleCloseMovie();
    //   return;
    // }
    // console.log("Sorry But you already rated");

    //We can do it here too
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  // if we set it like that this is awful as it will change the state and changes will be in the UI, but at the same time we will be sending an infinite requests to that api even after we fullfill our first req
  // fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=interstellar`)
  //   .then((res) => res.json())
  //   .then((data) => setMovies(data));

  useEffect(() => {
    const controller = new AbortController();
    // In the console if we log result we will see 2 responses, this is due to strict mode, to be double check, but this is only in development, in prod, everything is normal
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
          //so we use it as every time we type another req is being created + old ones also being processed
          //with it with a new keystroke we abore other ongoing requests that we done and the last one only becomes main
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    //so on every key press actually we are entering useEffect so that we are calling Close movie to close it
    handleCloseMovie();
    fetchMovies();

    //on every new keystroke our contorller will abort existing fetch req
    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorComponent message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
