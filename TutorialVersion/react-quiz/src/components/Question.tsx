import React from 'react';
import { Action, Question as QuestionObj } from '../App';
import Options from './Options';

export interface QuestionProps {
  question: QuestionObj;
  dispatch: React.ActionDispatch<[action: Action]>;
  answer: number | null;
}

export default function Question({
  question,
  dispatch,
  answer,
}: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
