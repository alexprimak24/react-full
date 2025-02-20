import { useEffect, useState } from "react";
import { KEY } from "../constants/constants";

export function useMovies(query: string) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // callback?.();
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
    fetchMovies();

    //on every new keystroke our contorller will abort existing fetch req
    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
