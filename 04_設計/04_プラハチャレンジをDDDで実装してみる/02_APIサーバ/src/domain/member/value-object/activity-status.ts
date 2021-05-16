import { ValueObject } from "domain/shared/value-object";

export const activityStatusValue = {
  active: "在籍中",
  inRecess: "休会中",
  left: "退会済み",
} as const;
type ActivityStatusType = typeof activityStatusValue[keyof typeof activityStatusValue];

export interface IActivityStatus {
  status: ActivityStatusType;
}
export class ActivityStatus extends ValueObject<IActivityStatus> {
  public get value(): string {
    return this.props.status;
  }

  private constructor(props: IActivityStatus) {
    super(props);
  }

  public static create(props: IActivityStatus): ActivityStatus {
    return new ActivityStatus(props);
  }

  public equals(props: ActivityStatus): boolean {
    return this.props.status === props.value;
  }
}
