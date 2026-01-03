import { useEffect, useCallback } from "react";
import { usePersistedReducer } from "./usePersistedReducer";
import { useLocalStorage } from "./useLocalStorage";
import {
  reducerQuestionState,
  initialQuestionState,
  type questionState,
} from "../localReducer/questionStateReducer";
import {
  ActionPayloadsTypes,
  type ActionPayload,
} from "../shared/actions/actionPayload";
import { STATUS_QUIZ } from "../shared/questionTypes";

const STORAGE_KEY = "react-quiz-state";
const STORAGE_VERSION_KEY = "react-quiz-version";
const CURRENT_VERSION = "1.0";

/**
 * Custom hook for managing quiz state with persistence
 * Automatically saves progress and restores it on reload
 */
export const useQuizState = () => {
  const { getStoredValue: getVersion, setStoredValue: setVersion } =
    useLocalStorage<string>(STORAGE_VERSION_KEY, CURRENT_VERSION);

  // Check version and clear if different
  useEffect(() => {
    const storedVersion = getVersion();
    if (storedVersion !== CURRENT_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      setVersion(CURRENT_VERSION);
    }
  }, [getVersion, setVersion]);

  const [state, dispatch] = usePersistedReducer<questionState, ActionPayload>(
    reducerQuestionState,
    initialQuestionState,
    STORAGE_KEY,
    // Fields to persist - only user progress
    [
      "index",
      "points",
      "highscore",
      "selectedAnswer",
      "secondsRemaining",
      "status",
      "topic",
    ]
  );

  // Function to clear the persisted state when the quiz is reset
  const clearPersistedState = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Wrapper for dispatch to handle special cases
  const enhancedDispatch = useCallback(
    (action: Parameters<typeof dispatch>[0]) => {
      // If the quiz is reset, clear localStorage
      if (action.type === ActionPayloadsTypes.RESET_QUIZ) {
        clearPersistedState();
      }

      // If the quiz is finished, we can decide whether to keep or clear
      // In this case, we keep the highscore but could clear the rest
      if (action.type === ActionPayloadsTypes.FINISH_QUIZ) {
        // The highscore will be saved automatically
      }

      dispatch(action);
    },
    [dispatch, clearPersistedState]
  );

  // Check if there is an active stored state
  const hasPersistedProgress = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;

      const parsedState = JSON.parse(stored) as Partial<questionState>;

      return (
        (parsedState.status === STATUS_QUIZ.READY ||
          parsedState.status === STATUS_QUIZ.ACTIVE) &&
        (parsedState.index ?? 0) > 0
      );
    } catch {
      return false;
    }
  }, []);

  return {
    state,
    dispatch: enhancedDispatch,
    clearPersistedState,
    hasPersistedProgress,
  };
};
