import { useEffect, type FC } from "react";
import { ActionPayloadsTypes } from "../../../shared/actions/actionPayload";
import type { TimerProps } from "./Timer.types";

const Timer: FC<TimerProps> = ({ dispatch, secondsRemaining }) => {
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

  const minutesRemaing = Math.floor(secondsRemaining / 60);
  const secondsLeft = secondsRemaining % 60;

  return (
    <div className="timer">
      {minutesRemaing}:{secondsLeft < 10 && "0"}
      {secondsLeft}
    </div>
  );
};

export default Timer;
