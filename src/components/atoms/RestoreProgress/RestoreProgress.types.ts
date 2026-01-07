import type { DialogTypeProps } from "../../../shared/DialogTypes";

export type RestoreProgressProps = {
  onRestore: () => void;
  onStartNew: () => void;
  persistance?: boolean;
} & DialogTypeProps;
