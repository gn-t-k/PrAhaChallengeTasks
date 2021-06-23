import { IMemberRepository } from "domain/member/member-repository-interface";
import { ChangeActivityStatusService } from "domain/member/service/change-activity-status-service";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Identifier } from "domain/shared/identifier";
import { ITeamRepository } from "domain/team/team-repository-interface";

export abstract class ChangeActivityStatus {
  private readonly memberRepository: IMemberRepository;
  private readonly teamRepository: ITeamRepository;
  private readonly activityStatus: ActivityStatus;

  public constructor(
    memberRepository: IMemberRepository,
    teamRepository: ITeamRepository,
    activityStatus: ActivityStatus,
  ) {
    this.memberRepository = memberRepository;
    this.teamRepository = teamRepository;
    this.activityStatus = activityStatus;
  }

  public execute = async (memberID: string): Promise<void> => {
    const member = await this.memberRepository.getByID(
      new Identifier(memberID),
    );

    if (member === null) {
      throw new Error("Member is not exists");
    }

    await new ChangeActivityStatusService(
      this.teamRepository,
      this.memberRepository,
    ).execute(member, this.activityStatus);
  };
}
