import React from "react";
import {
  ActionPayloadsTypes,
  type ActionPayload,
} from "../shared/actions/actionPayload";

type NextQuestionProps = {
  dispatch: React.Dispatch<ActionPayload<ActionPayloadsTypes>>;
  answer?: number;
  index: number;
  totalQuestions: number;
};

const NextQuestion: React.FC<NextQuestionProps> = ({
  dispatch,
  answer,
  index,
  totalQuestions,
}) => {
  if (answer === undefined) return null;

  return index < totalQuestions - 1 ? (
    <div>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: ActionPayloadsTypes.NEXT_QUESTION,
            payload: undefined,
          })
        }
      >
        Next Question
      </button>
    </div>
  ) : (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type: ActionPayloadsTypes.FINISH_QUIZ,
          payload: undefined,
        })
      }
    >
      Finish Quiz
    </button>
  );
};

export default NextQuestion;
