import React, { useReducer, useState } from 'react';

interface IncrementAction {
  type: 'increment';
  payload?: number;
}

interface DecrementAction {
  type: 'decrement';
  payload?: number;
}

interface SetCountAction {
  type: 'setCount';
  payload: number;
}

interface SetStepAction {
  type: 'setStep';
  payload: number;
}

interface ResetAction {
  type: 'reset';
}

type Action =
  | IncrementAction
  | DecrementAction
  | SetCountAction
  | SetStepAction
  | ResetAction;

interface State {
  count: number;
  step: number;
}

const initialState = { count: 0, step: 1 };

//takes current state and action
function reducer(state: State, action: Action) {
  const { type } = action;

  switch (type) {
    case 'increment': {
      //from state.step we take the step and increment our count with it
      return { ...state, count: state.count + state.step };
    }
    case 'decrement': {
      return { ...state, count: state.count - state.step };
    }
    case 'setCount': {
      return { ...state, count: action.payload };
    }
    case 'setStep': {
      return { ...state, step: action.payload };
    }
    case 'reset': {
      return { step: 1, count: 0 };
    }
    default:
      throw new Error('Unknown action');
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + state.count);
  console.log(date.setDate(date.getDate() + 100));
  const dec = function () {
    dispatch({ type: 'decrement', payload: -1 });
  };

  const inc = function () {
    dispatch({ type: 'increment', payload: 1 });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
