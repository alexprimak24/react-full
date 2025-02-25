import React, { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import { Error as ErrorComponent } from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';

enum STATUS {
  LOADING = 'loading',
  ERROR = 'error',
  READY = 'ready',
  ACTIVE = 'active',
  FINISHED = 'finished',
}
//FOR STATE
interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface State {
  questions: Question[];
  status: STATUS;
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

export type Action = DataPresentAction | NoDataPresentAction | StartQuizAction;

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: STATUS.LOADING,
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
    default:
      throw new Error('Action unknown');
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
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
        {status === STATUS.ACTIVE && <Question />}
      </Main>
    </div>
  );
}

export default App;
