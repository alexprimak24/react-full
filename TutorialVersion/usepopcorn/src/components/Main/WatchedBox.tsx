import React, { ReactNode, useState } from "react";

interface WatchedBoxProps {
  children: ReactNode;
}

function WatchedBox({ children }: WatchedBoxProps) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className='box'>
      <button
        className='btn-toggle'
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && <>{children}</>}
    </div>
  );
}

export default WatchedBox;
