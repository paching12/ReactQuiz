import React from "react";

type ProgressBarProps = {
  index: number;
  totalQuestions: number;
  points?: number;
  maxPoints?: number;
  selectedAnswer?: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  index,
  totalQuestions,
  points,
  maxPoints,
  selectedAnswer,
}) => {
  return (
    <header className="progress">
      <progress
        value={index + Number(selectedAnswer !== undefined)}
        max={totalQuestions - 1}
      />
      <p>
        Question <strong>{index + 1}</strong> / {totalQuestions}
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
