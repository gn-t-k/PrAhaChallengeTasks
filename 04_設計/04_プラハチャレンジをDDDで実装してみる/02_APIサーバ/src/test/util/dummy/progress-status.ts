import { ProgressStatus } from "domain/exercise/value-object/progress-status";

const makeProgressStatusNotStartedYet = (): ProgressStatus =>
  ProgressStatus.create();
const makeProgressStatusWaitingForReview = (): ProgressStatus =>
  makeProgressStatusNotStartedYet().getNext();
const makeProgressStatusDone = (): ProgressStatus =>
  makeProgressStatusWaitingForReview().getNext();

export {
  makeProgressStatusNotStartedYet,
  makeProgressStatusWaitingForReview,
  makeProgressStatusDone,
};
