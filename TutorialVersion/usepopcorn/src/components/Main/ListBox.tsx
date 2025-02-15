import React, { ReactNode, useState } from "react";
import MovieList from "./MovieList";

interface ListBoxProps {
  children: ReactNode;
}

function ListBox({ children }: ListBoxProps) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className='box'>
      <button
        className='btn-toggle'
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

export default ListBox;
