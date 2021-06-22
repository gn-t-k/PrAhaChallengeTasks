import { IMemberRepository } from "domain/member/member-repository-interface";
import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";
import { ChangeActivityStatus } from "usecase/change-activity-status";

export class ChangeActivityStatusToActive extends ChangeActivityStatus {
  constructor(memberRepository: IMemberRepository) {
    super(
      memberRepository,
      new ActivityStatus({ status: activityStatusValue.active }),
    );
  }
}
