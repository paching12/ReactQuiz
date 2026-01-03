import { TOPIC_TYPES } from "../../shared/topicTypes";
import type { questionState } from "../../localReducer/questionStateReducer";

export const ActionPayloadsTypes = {
  PRELOAD: "PRELOAD",
  RESET_QUIZ: "RESET_QUIZ",
  DATA_FAILED: "DATA_FAILED",
  START_QUESTION: "START_QUESTION",
  NEXT_QUESTION: "NEXT_QUESTION",
  PREV_QUESTION: "PREV_QUESTION",
  SELECT_ANSWER: "SELECT_ANSWER",
  FINISH_QUIZ: "FINISH_QUIZ",
  TICK: "TICK",
  TOPIC_SELECTION: "TOPIC_SELECTION",
} as const;

export type ActionPayloadsTypes =
  (typeof ActionPayloadsTypes)[keyof typeof ActionPayloadsTypes];

export type ActionContent = {
  PRELOAD: questionState;
  RESET_QUIZ: undefined;
  DATA_FAILED: undefined;
  START_QUESTION: undefined;
  NEXT_QUESTION: undefined;
  PREV_QUESTION: undefined;
  SELECT_ANSWER: number;
  FINISH_QUIZ: undefined;
  TICK: undefined;
  TOPIC_SELECTION: keyof typeof TOPIC_TYPES;
};

export type ActionPayloadType = {
  [T in keyof ActionContent]: { type: T; payload: ActionContent[T] };
}[keyof ActionContent];

export type ActionPayload = ActionPayloadType;
