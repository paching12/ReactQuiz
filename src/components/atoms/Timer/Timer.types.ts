import type {
  ActionPayload,
  ActionPayloadsTypes,
} from "../../../shared/actions/actionPayload";

export type TimerProps = {
  dispatch: React.Dispatch<ActionPayload<ActionPayloadsTypes>>;
  secondsRemaining: number;
};
