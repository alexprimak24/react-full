import React, { useEffect, useReducer } from 'react';
import DateCounter from './components/DateCounter';
import Header from './components/Header';
import Main from './components/Main';

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

type Action = DataPresentAction | NoDataPresentAction;

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
    default:
      throw new Error('Action unknown');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}

export default App;
