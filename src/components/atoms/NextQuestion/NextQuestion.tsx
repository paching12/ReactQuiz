import React from "react";
import { ActionPayloadsTypes } from "../../../shared/actions/actionPayload";
import type { NextQuestionProps } from ".";

const NextQuestion: React.FC<NextQuestionProps> = ({
  dispatch,
  answer,
  index,
  totalQuestions,
}) => {
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
