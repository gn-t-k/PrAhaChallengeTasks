import { ValueObject } from "domain/shared/value-object";

const progressStatusObject = {
  notStartedYet: "未着手",
  waitingForReview: "レビュー待ち",
  done: "完了",
} as const;
type ProgressStatusType = typeof progressStatusObject[keyof typeof progressStatusObject];

interface IProgressStatus {
  value: ProgressStatusType;
}

export class ProgressStatus extends ValueObject<IProgressStatus> {
  public get value(): ProgressStatusType {
    return this.props.value;
  }

  private constructor(props: IProgressStatus) {
    super(props);
  }

  public static create(): ProgressStatus {
    return new ProgressStatus({ value: progressStatusObject.notStartedYet });
  }

  public static getNextStatus(progressStatus: ProgressStatus): ProgressStatus {
    switch (progressStatus.value) {
      case progressStatusObject.notStartedYet:
        return new ProgressStatus({
          value: progressStatusObject.waitingForReview,
        });
      case progressStatusObject.waitingForReview:
        return new ProgressStatus({ value: progressStatusObject.done });
      default:
        throw new Error("Illegal status manipulation");
    }
  }

  public static getPreviousStatus(
    progressStatus: ProgressStatus,
  ): ProgressStatus {
    switch (progressStatus.value) {
      case progressStatusObject.done:
        return new ProgressStatus({
          value: progressStatusObject.waitingForReview,
        });
      case progressStatusObject.waitingForReview:
        return new ProgressStatus({
          value: progressStatusObject.notStartedYet,
        });
      default:
        throw new Error("Illegal status manipulation");
    }
  }

  public isCompleted(): boolean {
    return this.props.value === progressStatusObject.done;
  }

  public equals(progressStatus: ProgressStatus): boolean {
    return this.props.value === progressStatus.value;
  }
}
