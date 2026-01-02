import { type FC } from "react";
import Options from "../../atoms/Option/Options";
import { useQuiz } from "../../../QuizContext/QuizContext";

const Question: FC = () => {
  const { state, dispatch } = useQuiz();
  const { questions, index, selectedAnswer } = state;
  const { question, options: answers, correctOption } = questions[index];

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
