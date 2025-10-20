import type {
  ActionPayload,
  ActionPayloadsTypes,
} from "../../../shared/actions/actionPayload";

export type NextQuestionProps = {
  dispatch: React.Dispatch<ActionPayload<ActionPayloadsTypes>>;
  answer?: number;
  index: number;
  totalQuestions: number;
};
