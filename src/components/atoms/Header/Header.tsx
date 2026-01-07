import { useMemo } from "react";
import { useQuiz } from "../../../Context/QuizContext/QuizContext";
import topics from "../../../data/Topics/topics";
import reactLogo from "./../../../assets/react.svg";
import { ActionPayloadsTypes } from "../../../shared/actions/actionPayload";
import { STATUS_QUIZ } from "../../../shared/questionTypes";

function Header() {
  const { state, dispatch, setShowRestoreDialog } = useQuiz();
  const { topic, status } = state;
  const currentImage = useMemo(
    () => topics.find((item) => item.type === topic)?.icon || reactLogo,
    [topic]
  );

  const clickHandler = () => {
    if (status === STATUS_QUIZ.ACTIVE) setShowRestoreDialog(true);
    dispatch({
      type: ActionPayloadsTypes.SET_DIALOG_DATA,
      payload: {
        title: "💥 You are leaving your current quiz",
        question: "Are you sure to exit? Your progress will be lost",
        restoreButtonTitle: "Close",
        startButtonTitle: "Exit",
      },
    });
  };

  return (
    <header className="app-header">
      <img
        src={currentImage}
        alt="React logo"
        onClick={clickHandler}
        className="header-img"
      />
      <h1 className="header-title">The React Quiz</h1>
    </header>
  );
}

export default Header;
