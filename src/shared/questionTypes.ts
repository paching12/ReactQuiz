export type question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type StatusQuestion =
  | "READY"
  | "ACTIVE"
  | "FINISHED"
  | "LOADING"
  | "ERROR";

export const STATUS_QUIZ: Record<StatusQuestion, string> = {
  READY: "ready",
  ACTIVE: "active",
  FINISHED: "finished",
  LOADING: "loading",
  ERROR: "error",
};
