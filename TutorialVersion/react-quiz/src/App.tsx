import React, { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import { Error as ErrorComponent } from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import RestartButton from './components/RestartButton';
import Timer from './components/Timer';

enum STATUS {
  LOADING = 'loading',
  ERROR = 'error',
  READY = 'ready',
  ACTIVE = 'active',
  FINISHED = 'finished',
}
//FOR STATE
export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface State {
  questions: Question[];
  status: STATUS;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
}

//FOR ACTION

interface DataPresentAction {
  type: 'dataReceived';
  payload: Question[];
}
interface NoDataPresentAction {
  type: 'dataFailed';
}
interface StartQuizAction {
  type: 'start';
}

interface NewAnswerAction {
  type: 'newAnswer';
  payload: number;
}

interface NextQuestionAction {
  type: 'nextQuestion';
}

interface FinishQuizAction {
  type: 'finish';
}

interface RestartQuizAction {
  type: 'restart';
}

export type Action =
  | DataPresentAction
  | NoDataPresentAction
  | StartQuizAction
  | NewAnswerAction
  | NextQuestionAction
  | FinishQuizAction
  | RestartQuizAction;

const initialState: State = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: STATUS.LOADING,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'dataReceived': {
      return { ...state, questions: action.payload, status: STATUS.READY };
    }
    case 'dataFailed': {
      return { ...state, status: STATUS.ERROR };
    }
    case 'start': {
      return { ...state, status: STATUS.ACTIVE };
    }
    case 'newAnswer': {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case 'nextQuestion': {
      return { ...state, index: state.index++, answer: null };
    }
    case 'finish': {
      return {
        ...state,
        status: STATUS.FINISHED,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    case 'restart': {
      return {
        ...state,
        index: 0,
        answer: null,
        status: STATUS.ACTIVE,
        points: 0,
      };
    }
    default:
      throw new Error('Action unknown');
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0,
  );
  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === STATUS.LOADING && <Loader />}
        {status === STATUS.ERROR && <ErrorComponent />}
        {status === STATUS.READY && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === STATUS.ACTIVE && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </footer>
          </>
        )}
        {status === STATUS.FINISHED && (
          <>
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
            >
              <RestartButton dispatch={dispatch} />
            </FinishScreen>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
