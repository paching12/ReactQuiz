import { useReducer, useRef, type Dispatch, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { ActionPayloadsTypes } from "../shared/actions/actionPayload";
import Data from "../data/questions.json";

export function usePersistedReducer<S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S,
  storageKey: string,
  statesToPersist?: (keyof S)[]
): [S, Dispatch<A>] {
  const { getStoredValue, setStoredValue } = useLocalStorage<Partial<S>>(
    storageKey,
    {}
  );

  const getInitialState = (): S => {
    const storedState = getStoredValue();

    if (Object.keys(storedState).length === 0) {
      return initialState;
    }

    // If specific fields to persist are provided
    if (statesToPersist) {
      const partialState: Partial<S> = {};
      statesToPersist.forEach((key) => {
        if (key in storedState) {
          partialState[key] = storedState[key];
        }
      });
      return { ...initialState, ...partialState };
    }

    // Restore all stored state
    return { ...initialState, ...storedState };
  };

  const isFirstRender = useRef(true);

  const [state, dispatch] = useReducer(reducer, initialState, getInitialState);

  // save to localStorage on state change
  useEffect(() => {
    // Save to localStorage only after the first render and fetch questions
    if (isFirstRender.current) {
      isFirstRender.current = false;

      (dispatch as Dispatch<unknown>)({
        type: ActionPayloadsTypes.SET_QUESTIONS,
        payload: Data.questions,
      });
      return;
    }

    const stateToStore: Partial<S> = statesToPersist
      ? statesToPersist.reduce((acc, key) => {
          acc[key] = state[key];
          return acc;
        }, {} as Partial<S>)
      : state;

    setStoredValue(stateToStore);
  }, [state, setStoredValue, statesToPersist]);

  return [state, dispatch];
}
