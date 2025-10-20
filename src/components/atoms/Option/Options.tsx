import { type FC } from "react";
import { ActionPayloadsTypes } from "../../../shared/actions/actionPayload";
import type { OptionProps } from ".";

const Options: FC<OptionProps> = ({
  answers,
  correctOption,
  dispatch,
  selectedAnswer,
}) => {
  const handleCorrectOption = (currentAnswer: number) => {
    dispatch({
      type: ActionPayloadsTypes.SELECT_ANSWER,
      payload: currentAnswer,
    });
  };

  const hasAnswer = selectedAnswer !== undefined;
  return (
    <div className="options">
      {answers.map((answer, index) => (
        <button
          key={`${index}.${answer}`}
          className={`btn btn-option ${
            index === selectedAnswer ? "answer" : ""
          } ${
            hasAnswer ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          onClick={() => handleCorrectOption(index)}
          disabled={hasAnswer}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Options;
