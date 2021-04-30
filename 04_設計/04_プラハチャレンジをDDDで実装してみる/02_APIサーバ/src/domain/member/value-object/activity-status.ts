export interface IActivityStatus {
  status: string;
}
export class ActivityStatus {
  private props: IActivityStatus;

  constructor(status: string) {
    if (status.length === 0) {
      throw new Error("Invalid status value.");
    }

    this.props = { status };
  }

  public get value(): string {
    return this.props.status;
  }

  public equals(activityStatus: ActivityStatus): boolean {
    return activityStatus.value === this.props.status;
  }
}
