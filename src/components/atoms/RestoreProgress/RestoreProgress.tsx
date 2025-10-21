import type { FC } from "react";
import { useQuizState } from "./../../../hooks/useQuizState";
import "./RestoreProgress.css";
import type { RestoreProgressProps } from "./RestoreProgress.types";
import "./RestoreProgress.css";

/**
 * Optional component that shows a message when there is saved progress
 * Allows the user to decide whether to continue or start anew
 */
const RestoreProgress: FC<RestoreProgressProps> = ({
  onRestore,
  onStartNew,
}) => {
  const { hasPersistedProgress } = useQuizState();

  if (!hasPersistedProgress()) {
    return null;
  }

  return (
    <div className="restore-progress">
      <div className="restore-progress-content">
        <h3>📌 Saved Progress Detected</h3>
        <p>
          You have a quiz in progress. Do you want to continue where you left
          off?
        </p>
        <div className="restore-progress-buttons">
          <button className="btn btn-primary" onClick={onRestore}>
            Continue Quiz
          </button>
          <button className="btn btn-secondary" onClick={onStartNew}>
            Start New Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreProgress;
