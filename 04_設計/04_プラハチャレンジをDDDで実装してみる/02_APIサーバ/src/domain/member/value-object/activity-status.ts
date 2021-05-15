import { ValueObject } from "domain/shared/value-object";

export interface IActivityStatus {
  status: string;
}
export class ActivityStatus extends ValueObject<IActivityStatus> {
  constructor(props: IActivityStatus) {
    if (props.status === "") {
      throw new Error("Invalid status value.");
    }

    super(props);
  }

  public get value(): string {
    return this.props.status;
  }

  public equals(activityStatus: ActivityStatus): boolean {
    return activityStatus.value === this.props.status;
  }
}
