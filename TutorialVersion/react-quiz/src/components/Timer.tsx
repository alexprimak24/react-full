import React, { useEffect } from 'react';
import { Action } from '../App';

interface TimerProps {
  dispatch: React.ActionDispatch<[action: Action]>;
  secondsRemaining: number;
}

export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    //the cleanup function will run for the last time when the component is about to unmount
    //Timer will unmount as it will be removed from the tree as we change status of the game to finished
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes < 10 && '0'}
      {minutes + ':' + seconds}
    </div>
  );
}
