import { useReducer, useState } from "react";

interface IncrementAction {
  type: 'increment';
  payload?: number; // optional for increment
}

interface DecrementAction {
  type: 'decrement';
  payload?: number; // optional for decrement
}

interface SetCountAction {
  type: 'setCount';
  payload: number; // required for setCount
}

type Action = IncrementAction | DecrementAction | SetCountAction;

interface State {
  count:number;
}

//takes current state and action
function reducer(state:State, action: Action) {
  const {type} = action;

  switch(type){
    case "increment": {
      return {...state, count: state.count + 1}
    }
    case "decrement": {
      return {...state, count: state.count - 1}
    }
    case "setCount": {
      return {...state, count: action.payload }
    }
  }

}

function DateCounter() {
  // const [count, setCount] = useState(0);

  const [count, dispatch] = useReducer(reducer, {count: 0})

  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count.count);
console.log(date.setDate(date.getDate() + 100))
  const dec = function () {
    dispatch({type:"decrement", payload: -1})
  };

  const inc = function () {
    dispatch({type:"increment", payload: 1})
  };

  const defineCount = function (e:React.ChangeEvent<HTMLInputElement >) {
    dispatch({type:"setCount", payload: Number(e.target.value)})
  };

  const defineStep = function (e:React.ChangeEvent<HTMLInputElement >) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({type:"setCount", payload: 0})
    // setCount(0);
    setStep(1);
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
        <input value={count.count} onChange={defineCount} />
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
