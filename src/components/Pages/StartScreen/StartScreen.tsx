import type { FC } from "react";
import type { StartScreenProp } from ".";
import { useQuiz } from "../../../QuizContext/QuizContext";
import { ActionPayloadsTypes } from "../../../shared/actions/actionPayload";

const StartScreen: FC<StartScreenProp> = () => {
  const { state, dispatch } = useQuiz();
  const { questions } = state;

  const onStartHandle = () => {
    dispatch({
      type: ActionPayloadsTypes.START_QUESTION,
      payload: undefined,
    });
  };

  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{questions.length} question to test your React mastery</h3>
      <button className="btn btn-ui" onClick={onStartHandle}>
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
