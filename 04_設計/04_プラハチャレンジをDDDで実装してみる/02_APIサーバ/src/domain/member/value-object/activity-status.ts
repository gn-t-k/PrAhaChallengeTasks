export class ActivityStatus {
  private status_: string;

  constructor(status: string) {
    if (status.length === 0) {
      throw new Error("Invalid status value.");
    }

    this.status_ = status;
  }

  public get value(): string {
    return this.status_;
  }

  public equals(activityStatus: ActivityStatus): boolean {
    return activityStatus.value === this.status_;
  }
}
