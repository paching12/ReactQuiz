import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

const ACTIONS = {
  INCREASE_COUNTER: "INCREASE_COUNTER",
  DECREASE_COUNTER: "DECREASE",
  SET_COUNT: "SET_COUNT",
  INCREASE_STEPS: "INCREASE_STEPS",
  DECREASE_STEPS: "DECREASE",
  SET_STEPS: "SET_STEPS",
  RESET: "RESET_STATE",
};

function reducer(
  state: { count: number; step: number },
  action: { type: string; payload?: number }
) {
  switch (action.type) {
    case ACTIONS.INCREASE_COUNTER:
      return {
        ...state,
        count: state.count + (action?.payload || 0),
      };
    case ACTIONS.DECREASE_COUNTER:
      return {
        ...state,
        count: state.count - (action?.payload || 0),
      };
    case ACTIONS.SET_COUNT:
      return {
        ...state,
        count: action.payload || initialState.count,
      };
    case ACTIONS.INCREASE_STEPS:
      return {
        ...state,
        step: state.step + (action?.payload || 0),
      };
    case ACTIONS.DECREASE_STEPS:
      return {
        ...state,
        step: state.step - (action?.payload || 0),
      };
    case ACTIONS.SET_STEPS:
      return {
        ...state,
        step: action.payload || initialState.step,
      };
    case ACTIONS.RESET:
      return initialState;
    default:
      return initialState;
  }
}

function DateCounter() {
  //   const [count, setCount] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({
      type: ACTIONS.DECREASE_COUNTER,
      payload: step,
    });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({
      type: ACTIONS.INCREASE_COUNTER,
      payload: step,
    });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    // setCount(Number(e.target.value));
    dispatch({
      type: ACTIONS.SET_COUNT,
      payload: Number(e.target.value),
    });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    // setStep(Number(e.target.value));
    console.log("on change step", e.target.value);
    dispatch({
      type: ACTIONS.SET_STEPS,
      payload: Number(e.target.value),
    });
  };

  const reset = function () {
    dispatch({
      type: ACTIONS.RESET,
    });
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
