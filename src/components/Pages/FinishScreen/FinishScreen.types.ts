import type {
  ActionPayload,
  ActionPayloadsTypes,
} from "../../../shared/actions/actionPayload";

export type FinishedScreenProps = {
  points: number;
  maxPoints: number;
  highscore?: number;
  dispatch: React.Dispatch<ActionPayload<ActionPayloadsTypes>>;
};
