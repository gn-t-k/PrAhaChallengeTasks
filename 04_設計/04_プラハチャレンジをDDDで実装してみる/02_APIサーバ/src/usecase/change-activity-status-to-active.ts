import { IMemberRepository } from "domain/member/member-repository-interface";
import {
  ActivityStatus,
  activityStatusValue,
} from "domain/member/value-object/activity-status";
import { TeamRepository } from "infra/db/repository/team-repository";
import { ChangeActivityStatus } from "usecase/change-activity-status";

export class ChangeActivityStatusToActive extends ChangeActivityStatus {
  constructor(
    memberRepository: IMemberRepository,
    teamRepository: TeamRepository,
  ) {
    super(
      memberRepository,
      teamRepository,
      new ActivityStatus({ status: activityStatusValue.active }),
    );
  }
}
