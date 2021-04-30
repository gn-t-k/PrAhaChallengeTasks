import { ActivityStatus } from "domain/member/value-object/activity-status";

export interface IActivityStatusList {
  activityStatusList: ActivityStatus[];
}
export class ActivityStatusList {
  private props: IActivityStatusList;

  constructor(activityStatusList: ActivityStatus[]) {
    if (new Set(activityStatusList).size !== activityStatusList.length) {
      throw new Error("Duplicate status value.");
    }

    this.props = { activityStatusList };
  }

  public get all(): ActivityStatus[] {
    return this.props.activityStatusList;
  }
}
