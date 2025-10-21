import { useEffect, useState } from "react";

// Atoms
import ErrorComponent from "./components/atoms/ErrorComponent/Error";
import Footer from "./components/atoms/Footer/Footer";
import Header from "./components/atoms/Header/Header";
import Loader from "./components/atoms/Loader/Loader";
import FontLoader from "./components/atoms/FontLoader/FontLoader";
import Main from "./components/atoms/Main/Main";
import NextQuestion from "./components/atoms/NextQuestion/NextQuestion";
import ProgressBar from "./components/atoms/ProgressBar/ProgressBar";
import { RestoreProgress } from "./components/atoms/RestoreProgress";
import Timer from "./components/atoms/Timer/Timer";

// Molecules
import Question from "./components/molecules/Question/Question";

// Pages
import { StartScreen } from "./components/Pages/StartScreen";
import { FinishScreen } from "./components/Pages/FinishScreen";

// Actions
import { ActionPayloadsTypes } from "./shared/actions/actionPayload";

//Constants & Types
import { STATUS_QUIZ } from "./shared/questionTypes";

// Data
import Data from "./data/questions.json";

import "./index.css";
import { useQuizState } from "./hooks/useQuizState";
import { useFontLoader } from "./hooks/useFontLoader";

function App() {
  const { state, dispatch, clearPersistedState, hasPersistedProgress } =
    useQuizState();

  // Esperar a que la fuente esté cargada
  const fontLoaded = useFontLoader("Codystar", 3000);

  const [showRestoreDialog, setShowRestoreDialog] = useState(
    hasPersistedProgress()
  );
  console.log("hasPersistedProgress:", hasPersistedProgress());

  const {
    questions,
    status,
    index,
    selectedAnswer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  useEffect(() => {
    // Simulate fetching data from an API
    // fetch("http://localhost:8000/questions")
    //   .then((res) => res.json())
    //   .then((data) =>
    //     dispatch({
    //       type: ActionPayloadsTypes.SET_QUESTIONS,
    //       payload: data,
    //     })
    //   )
    //   .catch((err) => {
    //     console.error(err);
    //     dispatch({
    //       type: ActionPayloadsTypes.DATA_FAILED,
    //       payload: undefined,
    //     });
    //   });
    dispatch({
      type: ActionPayloadsTypes.SET_QUESTIONS,
      payload: Data.questions,
    });
  }, [dispatch]);

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

  const { question, options, correctOption } = questions?.[index] || {};

  const maxPoints = questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

  // Show loader while font is loading
  if (!fontLoaded) {
    return <FontLoader />;
  }

  return (
    <>
      <div className="app">
        <Header />

        <Main>
          {status === STATUS_QUIZ.LOADING && <Loader />}
          {(status === STATUS_QUIZ.ERROR || !questions.length) && (
            <ErrorComponent />
          )}
          {status === STATUS_QUIZ.READY && (
            <StartScreen
              questions={questions}
              onStart={() =>
                dispatch({
                  type: ActionPayloadsTypes.START_QUESTION,
                  payload: undefined,
                })
              }
            />
          )}
          {status === STATUS_QUIZ.ACTIVE && questions.length > 0 && (
            <>
              <ProgressBar
                maxPoints={maxPoints}
                points={points}
                totalQuestions={questions.length}
                index={index}
                selectedAnswer={selectedAnswer}
              />
              <Question
                question={question}
                answers={options}
                correctOption={correctOption}
                dispatch={dispatch}
                selectedAnswer={selectedAnswer}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining || 0}
                />
                <NextQuestion
                  dispatch={dispatch}
                  answer={selectedAnswer}
                  index={index}
                  totalQuestions={questions.length}
                />
              </Footer>
            </>
          )}

          {status === STATUS_QUIZ.FINISHED && (
            <>
              <FinishScreen
                points={points || 0}
                maxPoints={maxPoints || 0}
                highscore={highscore}
                dispatch={dispatch}
              />
            </>
          )}

          {showRestoreDialog && (
            <RestoreProgress
              onRestore={handleRestore}
              onStartNew={handleStartNew}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
