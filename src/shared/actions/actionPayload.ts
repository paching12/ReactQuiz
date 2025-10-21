import type { question } from "../questionTypes";

export const ActionPayloadsTypes = {
  SET_QUESTIONS: "SET_QUESTIONS",
  RESET_QUIZ: "RESET_QUIZ",
  DATA_FAILED: "DATA_FAILED",
  START_QUESTION: "START_QUESTION",
  NEXT_QUESTION: "NEXT_QUESTION",
  PREV_QUESTION: "PREV_QUESTION",
  SELECT_ANSWER: "SELECT_ANSWER",
  FINISH_QUIZ: "FINISH_QUIZ",
  TICK: "TICK",
} as const;

export type ActionPayloadsTypes =
  (typeof ActionPayloadsTypes)[keyof typeof ActionPayloadsTypes];

export type ActionContent = {
  SET_QUESTIONS: question[];
  RESET_QUIZ: undefined;
  DATA_FAILED: undefined;
  START_QUESTION: undefined;
  NEXT_QUESTION: undefined;
  PREV_QUESTION: undefined;
  SELECT_ANSWER: number;
  FINISH_QUIZ: undefined;
  TICK: undefined;
};

export type ActionPayload<Type extends ActionPayloadsTypes> = {
  type: Type;
  payload: ActionContent[Type];
};
