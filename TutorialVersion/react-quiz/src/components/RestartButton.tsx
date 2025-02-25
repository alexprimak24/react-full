import React from 'react';
import { Action } from '../App';

interface RestartButtonProps {
  dispatch: React.ActionDispatch<[action: Action]>;
}
export default function RestartButton({ dispatch }: RestartButtonProps) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'restart' })}
    >
      Retry
    </button>
  );
}
