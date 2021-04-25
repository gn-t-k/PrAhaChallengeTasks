import { ActivityStatus } from "domain/member/value-object/activity-status";

export class ActivityStatusList {
  private activityStatusList_: ActivityStatus[];
  private currentStatus_: ActivityStatus;

  constructor(
    activityStatusList: ActivityStatus[],
    defaultStatusIndex: number,
  ) {
    if (
      defaultStatusIndex >= activityStatusList.length ||
      defaultStatusIndex < 0
    ) {
      throw new Error("Illegal index value.");
    }
    if (new Set(activityStatusList).size !== activityStatusList.length) {
      throw new Error("Duplicate status value.");
    }

    this.activityStatusList_ = activityStatusList;
    this.currentStatus_ = activityStatusList[defaultStatusIndex];
  }

  public get all(): ActivityStatus[] {
    return this.activityStatusList_;
  }

  public get currentStatus(): ActivityStatus {
    return this.currentStatus_;
  }
}
