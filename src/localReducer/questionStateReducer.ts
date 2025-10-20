import {
  ActionPayloadsTypes,
  type ActionPayload,
} from "../shared/actions/actionPayload";
import type { question } from "../shared/questionTypes";

const SECS_PER_QUESTION = 30;
export type questionState = {
  questions: question[];
  status: string;
  index: number;
  selectedAnswer?: number;
  points: number;
  highscore?: number;
  secondsRemaining?: number;
};

export const initialQuestionState: questionState = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
  highscore: 0,
  secondsRemaining: undefined,
};

export const reducerQuestionState = (
  state: questionState,
  action: ActionPayload<ActionPayloadsTypes>
) => {
  switch (action.type) {
    case ActionPayloadsTypes.RESET_QUIZ:
      return {
        ...initialQuestionState,
        highscore: state.highscore,
        status: "ready",
        questions: state.questions,
      };
    case ActionPayloadsTypes.SET_QUESTIONS:
      return {
        ...state,
        questions: Array.isArray(action.payload) ? action.payload : [],
        status: "ready",
      };
    case ActionPayloadsTypes.DATA_FAILED:
      return {
        ...state,
        questions: [],
        status: "error",
      };
    case ActionPayloadsTypes.START_QUESTION:
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case ActionPayloadsTypes.NEXT_QUESTION:
      return {
        ...state,
        index:
          state.questions.length > state.index + 1
            ? state.index + 1
            : state.index,
        selectedAnswer: undefined,
      };
    case ActionPayloadsTypes.PREV_QUESTION:
      return {
        ...state,
        index: state.index ? state.index - 1 : 0,
      };
    case ActionPayloadsTypes.SELECT_ANSWER: {
      const currentQuestion = state.questions.at(state.index);

      const payload = action.payload as number;

      return {
        ...state,
        selectedAnswer: payload,
        points:
          (state.points ?? 0) +
          (currentQuestion && payload === currentQuestion.correctOption
            ? currentQuestion.points ?? 0
            : 0),
      };
    }
    case ActionPayloadsTypes.FINISH_QUIZ:
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > (state.highscore ?? 0)
            ? state.points
            : state.highscore,
      };

    case ActionPayloadsTypes.TICK:
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining !== undefined ? state.secondsRemaining - 1 : 0,
        status:
          state.secondsRemaining !== undefined && state.secondsRemaining <= 0
            ? "finished"
            : state.status,
      };
    default:
      throw new Error("action unknown");
  }
};
