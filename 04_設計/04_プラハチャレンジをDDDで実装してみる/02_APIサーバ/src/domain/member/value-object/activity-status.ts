export class ActivityStatus {
  private status_: string;

  constructor(status: string) {
    this.status_ = status;
  }

  public value(): string {
    return this.status_;
  }

  public equals(activityStatus: ActivityStatus): boolean {
    return activityStatus.value() === this.status_;
  }
}
