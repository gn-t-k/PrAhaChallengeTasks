import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { IsMemberExistsInTeamService } from "domain/team/service/is-member-exists-in-team-service";
import { ITeamRepository } from "domain/team/team-repository-interface";

export class ChangeActivityStatusService {
  private readonly memberRepository: IMemberRepository;
  private readonly teamRepository: ITeamRepository;

  public constructor(
    memberRepository: IMemberRepository,
    teamRepository: ITeamRepository,
  ) {
    this.memberRepository = memberRepository;
    this.teamRepository = teamRepository;
  }

  public execute = async (
    currentMember: Member,
    activityStatus: ActivityStatus,
  ): Promise<void> => {
    if (activityStatus.equals(currentMember.status)) {
      throw new Error(
        `Member's activity status is already 「${currentMember.status.value}」`,
      );
    }

    const isMemberExistsInTeam = await new IsMemberExistsInTeamService(
      this.teamRepository,
    ).execute(currentMember.id);
    if (!activityStatus.isAbleToJoinPair() && isMemberExistsInTeam) {
      throw new Error(
        "Cannnot change activity status because member is belongs to pair",
      );
    }

    const { id, name, email } = currentMember;
    const member = Member.rebuild(id, {
      name,
      email,
      activityStatus,
    });

    await this.memberRepository.update(member);
  };
}
