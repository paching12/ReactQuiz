import {
  ActionPayloadsTypes,
  type ActionPayload,
} from "../shared/actions/actionPayload";
import { STATUS_QUIZ, type question } from "../shared/questionTypes";
import { TOPIC_TYPES } from "../shared/topicTypes";
import { getQuestionsByTopic } from "../utils/GetQuestionsByTopic";

const SECS_PER_QUESTION = 30;
export type questionState = {
  questions: question[];
  status: string;
  index: number;
  selectedAnswer?: number;
  points: number;
  highscore?: number;
  secondsRemaining?: number;
  topic?: keyof typeof TOPIC_TYPES;
};

export const initialQuestionState: questionState = {
  questions: [],
  status: STATUS_QUIZ.SET_TOPIC,
  index: 0,
  points: 0,
  highscore: 0,
  secondsRemaining: undefined,
  topic: undefined,
};

export const reducerQuestionState = (
  state: questionState,
  action: ActionPayload
) => {
  switch (action.type) {
    case ActionPayloadsTypes.RESET_QUIZ:
      return {
        ...initialQuestionState,
        highscore: state.highscore,
        status: STATUS_QUIZ.SET_TOPIC,
        questions: state.questions,
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
        status: STATUS_QUIZ.ACTIVE,
        secondsRemaining:
          state.secondsRemaining === undefined
            ? state.questions.length * SECS_PER_QUESTION
            : state.secondsRemaining,
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
        status: STATUS_QUIZ.FINISHED,
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
            ? STATUS_QUIZ.FINISHED
            : state.status,
      };
    case ActionPayloadsTypes.TOPIC_SELECTION: {
      const lastTopic = action.payload;
      const questions = getQuestionsByTopic(lastTopic);

      return {
        ...state,
        status: STATUS_QUIZ.READY,
        topic: lastTopic,
        questions,
      };
    }
    case ActionPayloadsTypes.PRELOAD: {
      const lastState = action.payload;
      const questions =
        action.payload.topic !== undefined
          ? getQuestionsByTopic(action.payload.topic)
          : [];
      return {
        ...lastState,
        questions,
      };
    }
    default:
      throw new Error("action unknown");
  }
};
