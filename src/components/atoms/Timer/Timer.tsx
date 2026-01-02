import { useEffect, type FC } from "react";
import { ActionPayloadsTypes } from "../../../shared/actions/actionPayload";
import { useQuiz } from "../../../Context/QuizContext/QuizContext";

const Timer: FC = () => {
  const { dispatch, state } = useQuiz();

  const { secondsRemaining } = state;

  useEffect(() => {
    const setIntervalId = setInterval(() => {
      dispatch({
        type: ActionPayloadsTypes.TICK,
        payload: undefined,
      });
    }, 1000);

    return () => {
      clearInterval(setIntervalId);
    };
  }, [dispatch]);

  const minutesRemaing = Math.floor((secondsRemaining || 0) / 60);
  const secondsLeft = (secondsRemaining || 0) % 60;

  return (
    <div className="timer">
      {minutesRemaing}:{secondsLeft < 10 && "0"}
      {secondsLeft}
    </div>
  );
};

export default Timer;
