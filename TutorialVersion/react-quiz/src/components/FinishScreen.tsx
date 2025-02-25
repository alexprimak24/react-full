import React, { ReactNode } from 'react';

interface FinishedScreenProps {
  points: number;
  maxPossiblePoints: number;
  highscore: number;
  children?: ReactNode;
}
export default function FinishScreen({
  points,
  maxPossiblePoints,
  highscore,
  children,
}: FinishedScreenProps) {
  const persentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (persentage === 100) emoji = '🏆';
  if (persentage >= 80 && persentage < 100) emoji = '🎉';
  if (persentage >= 50 && persentage < 80) emoji = '🙃';
  if (persentage >= 0 && persentage < 50) emoji = '🤨';
  if (persentage === 0) emoji = '🤦‍♂️';

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {maxPossiblePoints} ({Math.ceil(persentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      {children}
    </>
  );
}
