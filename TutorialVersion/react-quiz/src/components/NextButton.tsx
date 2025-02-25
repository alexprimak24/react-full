import React from 'react';
import { Action } from '../App';

interface NextButtonProps {
  dispatch: React.ActionDispatch<[action: Action]>;
  answer: number | null;
}
export default function NextButton({ dispatch, answer }: NextButtonProps) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  );
}
