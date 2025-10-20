import { type FC } from "react";
import Options from "./Options";
import type {
  ActionPayload,
  ActionPayloadsTypes,
} from "../shared/actions/actionPayload";

type QuestionProp = {
  question: string;
  answers: string[];
  correctOption: number;
  selectedAnswer?: number;
  dispatch: React.Dispatch<ActionPayload<ActionPayloadsTypes>>;
};

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
