import React from 'react';
import { Action } from '../App';
import FinishScreen from './FinishScreen';

interface NextButtonProps {
  dispatch: React.ActionDispatch<[action: Action]>;
  answer: number | null;
  index: number;
  numQuestions: number;
}
export default function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: NextButtonProps) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </button>
    );
  } else {
    return null;
  }
}
