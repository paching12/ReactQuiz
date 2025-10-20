import type { FC } from "react";
import type { question } from "../shared/questionTypes";

type StartScreenProp = {
  questions: question[];
  onStart: () => void;
};

const StartScreen: FC<StartScreenProp> = ({ questions = [], onStart }) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{questions.length} question to test your React mastery</h3>
      <button className="btn btn-ui" onClick={onStart}>
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
