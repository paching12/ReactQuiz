import React from "react";
import { ActionPayloadsTypes } from "../../../shared/actions/actionPayload";
import { useQuiz } from "../../../QuizContext/QuizContext";

const NextQuestion: React.FC = () => {
  const { state, dispatch } = useQuiz();
  const { questions, index, selectedAnswer: answer } = state;
  const totalQuestions = questions.length;

  if (answer === undefined) return null;

  const textLabel =
    index < totalQuestions - 1 ? "Next Question" : "Finish Quiz";

  const handleClick = () => {
    if (index < totalQuestions - 1) {
      dispatch({
        type: ActionPayloadsTypes.NEXT_QUESTION,
        payload: undefined,
      });
    } else {
      dispatch({
        type: ActionPayloadsTypes.FINISH_QUIZ,
        payload: undefined,
      });
    }
  };

  return (
    <div>
      <button className="btn btn-ui" onClick={handleClick}>
        {textLabel}
      </button>
    </div>
  );
};

export default NextQuestion;
