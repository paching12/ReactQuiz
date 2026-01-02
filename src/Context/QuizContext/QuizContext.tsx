import { createContext, useContext, useState, type FC } from "react";
import type {
  QuizContextProps,
  QuizContextStateType,
} from "./QuizContext.types";
import { useQuizState } from "../../hooks/useQuizState";
import { ActionPayloadsTypes } from "../../shared/actions/actionPayload";
import { initialQuestionState } from "../../localReducer/questionStateReducer";

const QuizContext = createContext<QuizContextStateType>({
  state: initialQuestionState,
  showRestoreDialog: false,
  handleRestore: () => {},
  handleStartNew: () => {},
  dispatch: () => {},
  maxPoints: 0,
});

const QuizProvider: FC<QuizContextProps> = ({ children }) => {
  const { state, dispatch, clearPersistedState, hasPersistedProgress } =
    useQuizState();

  const [showRestoreDialog, setShowRestoreDialog] = useState(
    hasPersistedProgress()
  );

  const onStartQuiz = () => {
    dispatch({
      type: ActionPayloadsTypes.START_QUESTION,
      payload: undefined,
    });
  };

  const handleRestore = () => {
    setShowRestoreDialog(false);
    onStartQuiz();
  };

  const handleStartNew = () => {
    clearPersistedState();
    setShowRestoreDialog(false);
    dispatch({ type: ActionPayloadsTypes.RESET_QUIZ, payload: undefined });
  };

  const maxPoints = state?.questions?.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

  return (
    <QuizContext.Provider
      value={{
        state,
        showRestoreDialog,
        handleRestore,
        handleStartNew,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error("Quizz context was used outside the QuizProvdier");
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { QuizProvider, useQuiz };
