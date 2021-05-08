import { ActivityStatus } from "domain/member/value-object/activity-status";

export interface IActivityStatusList {
  activityStatusList: ActivityStatus[];
}
export class ActivityStatusList {
  private props: IActivityStatusList;

  constructor(props: IActivityStatusList) {
    if (isActivityStatusListDuplicated(props.activityStatusList)) {
      throw new Error("Duplicate status value.");
    }

    this.props = props;
  }

  public get all(): ActivityStatus[] {
    return this.props.activityStatusList;
  }
}

const isActivityStatusListDuplicated = (
  activityStatusList: ActivityStatus[],
): boolean => {
  const statusList = activityStatusList.map(
    (activityStatus) => activityStatus.value,
  );

  return new Set(statusList).size !== statusList.length;
};
