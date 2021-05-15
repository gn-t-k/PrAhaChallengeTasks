import { ValueObject } from "domain/shared/value-object";

export interface IActivityStatus {
  status: string;
}
export class ActivityStatus extends ValueObject<IActivityStatus> {
  public get value(): string {
    return this.props.status;
  }

  private constructor(props: IActivityStatus) {
    super(props);
  }

  public static create(props: IActivityStatus): ActivityStatus {
    if (props.status === "") {
      throw new Error("Invalid status value.");
    }

    return new ActivityStatus(props);
  }

  public equals(activityStatus: ActivityStatus): boolean {
    return activityStatus.value === this.props.status;
  }
}
