import type { ActionPayload } from "../../../shared/actions/actionPayload";

export type NextQuestionProps = {
  dispatch: React.Dispatch<ActionPayload>;
  answer?: number;
  index: number;
  totalQuestions: number;
};
