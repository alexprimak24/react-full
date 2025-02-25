import React from 'react';

interface ProgressProps {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
}
export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: ProgressProps) {
  return (
    <header className="progress">
      {/* Number(answer !== null) - the result will be boolean and will be 0 or 1 
     If the answer is not null it will be true and value will be value + 1 
     If the answer is null value + 0  */}
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
