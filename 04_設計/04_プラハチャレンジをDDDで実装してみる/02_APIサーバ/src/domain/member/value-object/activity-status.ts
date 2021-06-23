import { ValueObject } from "domain/shared/value-object";

export const activityStatusValue = {
  active: "在籍中",
  inRecess: "休会中",
  left: "退会済",
} as const;
type ActivityStatusType = typeof activityStatusValue[keyof typeof activityStatusValue];

export interface IActivityStatus {
  status: string;
}
export class ActivityStatus extends ValueObject<IActivityStatus> {
  public get value(): string {
    return this.props.status;
  }

  public static create = (props: IActivityStatus): ActivityStatus => {
    if (
      !Object.values(activityStatusValue).includes(
        props.status as ActivityStatusType,
      )
    ) {
      throw new Error("Invalid status value");
    }

    return new ActivityStatus(props);
  };

  public equals = (props: ActivityStatus): boolean =>
    this.props.status === props.value;

  public isAbleToJoinPair = (): boolean =>
    this.props.status === activityStatusValue.active;
}
