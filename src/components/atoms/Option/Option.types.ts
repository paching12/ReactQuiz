import type { ActionPayload } from "../../../shared/actions/actionPayload";

export type OptionProps = {
  answers: string[];
  correctOption: number;
  selectedAnswer?: number;
  dispatch: React.Dispatch<ActionPayload>;
};
