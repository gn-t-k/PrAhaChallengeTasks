import { ActivityStatus } from "domain/member/value-object/activity-status";

export class ActivityStatusList {
  private activityStatusList_: ActivityStatus[];
  private currentStatus_: ActivityStatus;

  constructor(
    activityStatusList: ActivityStatus[],
    defaultStatusIndex: number,
  ) {
    this.activityStatusList_ = activityStatusList;
    this.currentStatus_ = activityStatusList[defaultStatusIndex];
  }

  public get currentStatus(): ActivityStatus {
    return this.currentStatus_;
  }
}
