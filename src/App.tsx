import { useEffect, useReducer } from "react";

// Atoms
import ErrorComponent from "./components/atoms/ErrorComponent/Error";
import Footer from "./components/atoms/Footer/Footer";
import Header from "./components/atoms/Header/Header";
import Loader from "./components/atoms/Loader/Loader";
import Main from "./components/atoms/Main/Main";
import NextQuestion from "./components/atoms/NextQuestion/NextQuestion";
import ProgressBar from "./components/atoms/ProgressBar/ProgressBar";
import Timer from "./components/atoms/Timer/Timer";

// molecules
import Question from "./components/molecules/Question/Question";

// Pages
import { StartScreen } from "./components/Pages/StartScreen";
import { FinishScreen } from "./components/Pages/FinishScreen";

// Actions
import { ActionPayloadsTypes } from "./shared/actions/actionPayload";

// Reducers
import {
  initialQuestionState,
  reducerQuestionState,
} from "./localReducer/questionStateReducer";

import "./index.css";
function App() {
  const [
    {
      questions,
      status,
      index,
      selectedAnswer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducerQuestionState, initialQuestionState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: ActionPayloadsTypes.SET_QUESTIONS,
          payload: data,
        })
      )
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ActionPayloadsTypes.DATA_FAILED,
          payload: undefined,
        });
      });
  }, []);

  const { question, options, correctOption } = questions?.[index] || [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const maxPoints = questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

  return (
    <>
      <div className="app">
        <Header />

        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <ErrorComponent />}
          {status === "ready" && (
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
          {status === "active" && (
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

          {status === "finished" && (
            <>
              <FinishScreen
                points={points || 0}
                maxPoints={maxPoints || 0}
                highscore={highscore}
                dispatch={dispatch}
              />
            </>
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
