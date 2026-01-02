import React from "react";
import { useQuiz } from "../../../QuizContext/QuizContext";

const ProgressBar: React.FC = () => {
  const { state, maxPoints } = useQuiz();

  const { index, selectedAnswer, questions: totalQuestions, points } = state;

  return (
    <header className="progress">
      <progress
        value={index + Number(selectedAnswer !== undefined)}
        max={totalQuestions.length - 1}
      />
      <p>
        Question <strong>{index + 1}</strong> / {totalQuestions.length}
      </p>

      <p>
        <strong>
          {points} / {maxPoints}
        </strong>
      </p>
    </header>
  );
};

export default ProgressBar;
