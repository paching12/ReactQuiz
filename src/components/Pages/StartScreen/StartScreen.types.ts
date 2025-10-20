import type { question } from "../../../shared/questionTypes";

export type StartScreenProp = {
  questions: question[];
  onStart: () => void;
};
