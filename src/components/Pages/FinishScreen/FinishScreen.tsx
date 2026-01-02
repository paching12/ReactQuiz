import { useCallback } from "react";
import { ActionPayloadsTypes } from "./../../../shared/actions/actionPayload";
import { useQuiz } from "../../../Context/QuizContext/QuizContext";

const FinishScreen = () => {
  const { maxPoints, dispatch, state } = useQuiz();
  const { points: currentPoints, highscore } = state;
  const percentage = (currentPoints / maxPoints) * 100;

  const emoji = useCallback(() => {
    if (percentage === 100) return "🏆";
    if (percentage >= 80) return "🎉";
    if (percentage >= 50) return "🙂";
    return "😞";
  }, [percentage]);

  return (
    <>
      <p className="result">
        <span>{emoji()}</span>You scored <strong>{currentPoints}</strong> out of{" "}
        {maxPoints}({Math.ceil(percentage)}%)
      </p>
      {highscore !== undefined && (
        <p className="highscore">
          Your Highscore is <strong>{highscore}</strong> points!
        </p>
      )}
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: ActionPayloadsTypes.RESET_QUIZ,
            payload: undefined,
          })
        }
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
