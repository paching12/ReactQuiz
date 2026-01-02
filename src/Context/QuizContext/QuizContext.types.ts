import type { questionState } from "../../localReducer/questionStateReducer";
import type {
  ActionPayload,
  ActionPayloadsTypes,
} from "../../shared/actions/actionPayload";
import type { question } from "../../shared/questionTypes";

export type QuizContextProps = {
  children: React.ReactNode;
};

export type Quiz = {
  questions: question[];
  status: string;
  index: number;
  selectedAnswer: number;
  currentPoints: number;
  highscore: number;
  secondsRemaning: number;
};

export type QuizContextStateType = {
  showRestoreDialog: boolean;
  handleRestore: () => void;
  handleStartNew: () => void;
  dispatch: React.Dispatch<ActionPayload<ActionPayloadsTypes>>;

  maxPoints: number;
  state: questionState;
};
