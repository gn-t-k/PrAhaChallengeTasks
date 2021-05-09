import { ProgressStatus } from "domain/exercise/value-object/progress-status";

const makeProgressStatusNotStartedYet = (): ProgressStatus =>
  ProgressStatus.create();
const makeProgressStatusWaitingForReview = (): ProgressStatus =>
  ProgressStatus.getNextProgressStatus(makeProgressStatusNotStartedYet());
const makeProgressStatusDone = (): ProgressStatus =>
  ProgressStatus.getNextProgressStatus(makeProgressStatusWaitingForReview());

export {
  makeProgressStatusNotStartedYet,
  makeProgressStatusWaitingForReview,
  makeProgressStatusDone,
};
