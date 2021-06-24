import { IMemberRepository } from "domain/member/member-repository-interface";
import { ChangeActivityStatusService } from "domain/member/service/change-activity-status-service";
import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";
import { ChangeActivityStatus } from "usecase/change-activity-status";

export class ChangeActivityStatusToLeft extends ChangeActivityStatus {
  constructor(
    memberRepository: IMemberRepository,
    chageActivityStatusService: ChangeActivityStatusService,
  ) {
    super(
      memberRepository,
      chageActivityStatusService,
      new ActivityStatus({ status: activityStatusValue.left }),
    );
  }
}
