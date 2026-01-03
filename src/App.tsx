// Atoms
import ErrorComponent from "./components/atoms/ErrorComponent/Error";
import Footer from "./components/atoms/Footer/Footer";
import Header from "./components/atoms/Header/Header";
import Loader from "./components/atoms/Loader/Loader";
import FontLoader from "./components/atoms/FontLoader/FontLoader";
import Main from "./components/atoms/Main/Main";
import NextQuestion from "./components/atoms/NextQuestion/NextQuestion";
import ProgressBar from "./components/atoms/ProgressBar/ProgressBar";
import { RestoreProgress } from "./components/atoms/RestoreProgress";
import Timer from "./components/atoms/Timer/Timer";

// Molecules
import Question from "./components/molecules/Question/Question";

// Pages
import { StartScreen } from "./components/Pages/StartScreen";
import { FinishScreen } from "./components/Pages/FinishScreen";

//Constants & Types
import { STATUS_QUIZ } from "./shared/questionTypes";

// Hooks
import { useFontLoader } from "./hooks/useFontLoader";

import "./index.css";
import { useQuiz } from "./Context/QuizContext/QuizContext";
import { TopicChoice } from "./components/molecules/TopicChoice";

function App() {
  const { state, showRestoreDialog, handleRestore, handleStartNew } = useQuiz();

  // Esperar a que la fuente esté cargada
  const fontLoaded = useFontLoader("Codystar", 3000);

  const { questions, status } = state;

  // Show loader while font is loading
  if (!fontLoaded) {
    return <FontLoader />;
  }

  return (
    <>
      <div className="app">
        <Header />

        <Main>
          {status === STATUS_QUIZ.SET_TOPIC && <TopicChoice />}
          {status === STATUS_QUIZ.LOADING && <Loader />}
          {(status === STATUS_QUIZ.ERROR || !questions.length) &&
            status !== STATUS_QUIZ.SET_TOPIC && <ErrorComponent />}
          {status === STATUS_QUIZ.READY && <StartScreen />}
          {status === STATUS_QUIZ.ACTIVE && questions.length > 0 && (
            <>
              <ProgressBar />
              <Question />
              <Footer>
                <Timer />
                <NextQuestion />
              </Footer>
            </>
          )}

          {status === STATUS_QUIZ.FINISHED && (
            <>
              <FinishScreen />
            </>
          )}

          {showRestoreDialog && (
            <RestoreProgress
              onRestore={handleRestore}
              onStartNew={handleStartNew}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
