import { ValueObject } from "domain/shared/value-object";

const progressStatusValue = {
  notStartedYet: "未着手",
  waitingForReview: "レビュー待ち",
  done: "完了",
} as const;
type ProgressStatusType = typeof progressStatusValue[keyof typeof progressStatusValue];

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
    return new ProgressStatus({ value: progressStatusValue.notStartedYet });
  }

  public static getNextStatus(props: ProgressStatus): ProgressStatus {
    switch (props.value) {
      case progressStatusValue.notStartedYet:
        return new ProgressStatus({
          value: progressStatusValue.waitingForReview,
        });
      case progressStatusValue.waitingForReview:
        return new ProgressStatus({ value: progressStatusValue.done });
      default:
        throw new Error("Illegal status manipulation");
    }
  }

  public static getPreviousStatus(props: ProgressStatus): ProgressStatus {
    switch (props.value) {
      case progressStatusValue.done:
        return new ProgressStatus({
          value: progressStatusValue.waitingForReview,
        });
      case progressStatusValue.waitingForReview:
        return new ProgressStatus({
          value: progressStatusValue.notStartedYet,
        });
      default:
        throw new Error("Illegal status manipulation");
    }
  }

  public isCompleted(): boolean {
    return this.props.value === progressStatusValue.done;
  }

  public equals(props: ProgressStatus): boolean {
    return this.props.value === props.value;
  }
}
