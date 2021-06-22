import { IMemberRepository } from "domain/member/member-repository-interface";
import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";
import { ChangeActivityStatus } from "usecase/change-activity-status";

export class ChangeActivityStatusToLeft extends ChangeActivityStatus {
  constructor(memberRepository: IMemberRepository) {
    super(
      memberRepository,
      new ActivityStatus({ status: activityStatusValue.left }),
    );
  }
}
