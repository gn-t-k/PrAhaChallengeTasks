import { ProgressStatus } from "domain/exercise/value-object/progress-status";

const getProgressStatusNotStartedYet = (): ProgressStatus =>
  ProgressStatus.create();
const getProgressStatusWaitingForReview = (): ProgressStatus =>
  ProgressStatus.getNextProgressStatus(getProgressStatusNotStartedYet());
const getProgressStatusDone = (): ProgressStatus =>
  ProgressStatus.getNextProgressStatus(getProgressStatusWaitingForReview());

export {
  getProgressStatusNotStartedYet,
  getProgressStatusWaitingForReview,
  getProgressStatusDone,
};
