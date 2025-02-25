import React from 'react';
import { QuestionProps } from './Question';
import clsx from 'clsx';

export default function Options({ question, dispatch, answer }: QuestionProps) {
  const hadAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={clsx('btn btn-option ', {
            // [(index === question.correctOption ? 'correct' : 'wrong',
            // index === answer && 'answer')]: answer !== null,
            correct: hadAnswered && index === question.correctOption,
            wrong: hadAnswered && index !== question.correctOption,
            answer: index === answer,
          })}
          disabled={hadAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
