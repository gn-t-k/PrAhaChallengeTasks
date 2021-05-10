import { ProgressStatus } from "domain/exercise/value-object/progress-status";

const makeProgressStatusNotStartedYet = (): ProgressStatus =>
  ProgressStatus.create();
const makeProgressStatusWaitingForReview = (): ProgressStatus =>
  ProgressStatus.getNextStatus(makeProgressStatusNotStartedYet());
const makeProgressStatusDone = (): ProgressStatus =>
  ProgressStatus.getNextStatus(makeProgressStatusWaitingForReview());

export {
  makeProgressStatusNotStartedYet,
  makeProgressStatusWaitingForReview,
  makeProgressStatusDone,
};
