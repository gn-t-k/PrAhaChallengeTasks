import { ValueObject } from "domain/__shared__/value-object";

const progressStatusValue = {
  notStartedYet: "未着手",
  waitingForReview: "レビュー待ち",
  done: "完了",
} as const;
type ProgressStatusType = typeof progressStatusValue[keyof typeof progressStatusValue];

interface IProgressStatus {
  status: string;
}

export class ProgressStatus extends ValueObject<IProgressStatus> {
  public get value(): string {
    return this.props.status;
  }

  public static create = (): ProgressStatus =>
    new ProgressStatus({ status: progressStatusValue.notStartedYet });

  public static rebuild = (props: IProgressStatus): ProgressStatus => {
    if (
      !Object.values(progressStatusValue).includes(
        props.status as ProgressStatusType,
      )
    ) {
      throw new Error("Invalid status value");
    }

    return new ProgressStatus(props);
  };

  public getNext = (): ProgressStatus => {
    switch (this.props.status) {
      case progressStatusValue.notStartedYet:
        return new ProgressStatus({
          status: progressStatusValue.waitingForReview,
        });
      case progressStatusValue.waitingForReview:
        return new ProgressStatus({ status: progressStatusValue.done });
      default:
        throw new Error("Illegal status manipulation");
    }
  };

  public getPrevious = (): ProgressStatus => {
    switch (this.props.status) {
      case progressStatusValue.done:
        return new ProgressStatus({
          status: progressStatusValue.waitingForReview,
        });
      case progressStatusValue.waitingForReview:
        return new ProgressStatus({
          status: progressStatusValue.notStartedYet,
        });
      default:
        throw new Error("Illegal status manipulation");
    }
  };

  public isDone = (): boolean => this.props.status === progressStatusValue.done;

  public equals = (props: ProgressStatus): boolean =>
    this.props.status === props.value;
}
