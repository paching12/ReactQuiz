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
  title = "📌 Saved Progress Detected",
  question = "You have a quiz in progress. Do you want to continue where you left off?",
  restoreButtonTitle = "Continue Quiz",
  startButtonTitle = "Start New Quiz",
  onRestore,
  onStartNew,
  persistance,
}) => {
  const { hasPersistedProgress } = useQuizState();

  if (!hasPersistedProgress() && persistance) {
    return null;
  }

  return (
    <div className="restore-progress">
      <div className="restore-progress-content">
        <h3>{title}</h3>
        <p>{question}</p>
        <div className="restore-progress-buttons">
          <button className="btn btn-primary" onClick={onRestore}>
            {restoreButtonTitle}
          </button>
          <button className="btn btn-secondary" onClick={onStartNew}>
            {startButtonTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreProgress;
