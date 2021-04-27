import { ActivityStatus } from "domain/member/value-object/activity-status";

export class ActivityStatusList {
  private activityStatusList_: ActivityStatus[];

  constructor(activityStatusList: ActivityStatus[]) {
    if (new Set(activityStatusList).size !== activityStatusList.length) {
      throw new Error("Duplicate status value.");
    }

    this.activityStatusList_ = activityStatusList;
  }

  public get all(): ActivityStatus[] {
    return this.activityStatusList_;
  }
}
