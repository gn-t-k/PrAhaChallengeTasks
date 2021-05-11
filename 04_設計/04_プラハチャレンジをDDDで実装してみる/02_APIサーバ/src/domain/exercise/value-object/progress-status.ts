const progressStatusObject = {
  notStartedYet: "未着手",
  waitingForReview: "レビュー待ち",
  done: "完了",
} as const;
type ProgressStatusType = typeof progressStatusObject[keyof typeof progressStatusObject];

interface IProgressStatus {
  value: ProgressStatusType;
}

export class ProgressStatus {
  private props: IProgressStatus;

  private constructor(value: ProgressStatusType) {
    this.props = { value };
  }

  public get value(): ProgressStatusType {
    return this.props.value;
  }

  public static create(): ProgressStatus {
    return new ProgressStatus(progressStatusObject.notStartedYet);
  }

  public isCompleted(): boolean {
    return this.props.value === progressStatusObject.done;
  }

  public static getNextStatus(progressStatus: ProgressStatus): ProgressStatus {
    switch (progressStatus.value) {
      case progressStatusObject.notStartedYet:
        return new ProgressStatus(progressStatusObject.waitingForReview);
      case progressStatusObject.waitingForReview:
        return new ProgressStatus(progressStatusObject.done);
      default:
        throw new Error("Illegal status manipulation");
    }
  }

  public static getPreviousStatus(
    progressStatus: ProgressStatus,
  ): ProgressStatus {
    switch (progressStatus.value) {
      case progressStatusObject.done:
        return new ProgressStatus(progressStatusObject.waitingForReview);
      case progressStatusObject.waitingForReview:
        return new ProgressStatus(progressStatusObject.notStartedYet);
      default:
        throw new Error("Illegal status manipulation");
    }
  }
}
