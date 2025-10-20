import { type FC } from "react";
import Options from "../../atoms/Option/Options";
import type { QuestionProp } from ".";

const Question: FC<QuestionProp> = ({
  question,
  answers,
  correctOption,
  selectedAnswer,
  dispatch,
}) => {
  return (
    <div>
      <h4>{question}</h4>
      <Options
        answers={answers}
        correctOption={correctOption}
        dispatch={dispatch}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
};

export default Question;
