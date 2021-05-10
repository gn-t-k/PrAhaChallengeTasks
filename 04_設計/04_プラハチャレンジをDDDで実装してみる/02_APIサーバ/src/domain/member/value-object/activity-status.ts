export interface IActivityStatus {
  status: string;
}
export class ActivityStatus {
  private props: IActivityStatus;

  constructor(props: IActivityStatus) {
    if (props.status === "") {
      throw new Error("Invalid status value.");
    }

    this.props = props;
  }

  public get value(): string {
    return this.props.status;
  }

  public equals(activityStatus: ActivityStatus): boolean {
    return activityStatus.value === this.props.status;
  }
}
