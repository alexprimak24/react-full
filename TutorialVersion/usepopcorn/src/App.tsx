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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export interface WatchedMovieProps extends Movie {
  userRating: number;
  countRatingDesicions?: number;
}

export const average = (arr: number[]) =>
  arr.reduce((acc, cur, _i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState<WatchedMovieProps[]>(
    [],
    "watched"
  );
  // console.log(setWatched);

  //NOW THIS IS NOT NEEDED THANKS TO HOOK
  // const [watched, setWatched] = useState<WatchedMovieProps[]>([]);
  // We can set the state with function like that
  // Just remember FUNCTION HAVE TO BE PURE AND CANT RECEIVE ARGS
  // Pass the function that React can call later, do not call function inside useState

  // const [watched, setWatched] = useState<WatchedMovieProps[]>(() => {
  //   try {
  //     const storedValue = localStorage.getItem("watched");
  //     return JSON.parse(storedValue || "[]");
  //   } catch (error) {
  //     console.error("Error parsing watched movies: ", error);
  //     return [];
  //   }
  // });

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

  // if we set it like that this is awful as it will change the state and changes will be in the UI, but at the same time we will be sending an infinite requests to that api even after we fullfill our first req
  // fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=interstellar`)
  //   .then((res) => res.json())
  //   .then((data) => setMovies(data));

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
