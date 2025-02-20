import React, { useEffect, useRef, useState } from "react";
import { useKey } from "../../hooks/useKey";

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
function Search({ query, setQuery }: SearchProps) {
  const inputEl = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  // // this is not react way of doing things so better do not do it
  // const el = document.querySelector(".search");
  // el.focus();
  // }, []);

  //MOVED TO CUSTOM HOOK, BUT COMMENTS HERE SO DIDN"T DELETE
  //just reminder useEffect RUNS AFTER THE DOM HAS BEEN LOADED
  // useEffect(() => {
  //   function callback(e: KeyboardEvent) {
  //     if (document.activeElement === inputEl.current) return;
  //     if (e.code === "Enter") inputEl.current?.focus();
  //     setQuery("");
  //   }
  //   document.addEventListener("keydown", callback);

  //   return () => document.addEventListener("keydown", callback);
  // }, [setQuery]);

  //we can even paste a function like that
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery("");
  });

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      //so no there is no need to do any query selection and useEffect
      ref={inputEl}
    />
  );
}

export default Search;
