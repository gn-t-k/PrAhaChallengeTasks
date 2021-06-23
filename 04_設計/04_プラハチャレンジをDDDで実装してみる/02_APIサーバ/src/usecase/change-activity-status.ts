import { IMemberRepository } from "domain/member/member-repository-interface";
import { ActivityStatus } from "domain/member/value-object/activity-status";
import { Identifier } from "domain/shared/identifier";
import { IsMemberExistsInTeam } from "domain/team/domain-service/is-member-exists-in-team";
import { ITeamRepository } from "domain/team/team-repository-interface";

export abstract class ChangeActivityStatus {
  private readonly memberRepository: IMemberRepository;
  private readonly teamRepository: ITeamRepository;
  private readonly activityStatus: ActivityStatus;

  constructor(
    teamRepository: ITeamRepository,
    memberRepository: IMemberRepository,
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

    if (
      !this.activityStatus.isAbleToJoinPair() &&
      new IsMemberExistsInTeam(this.teamRepository)
    ) {
      // TODO: これはユースケースに書くべきではない
      throw new Error(
        "Cannnot change activity status because member is belongs to pair",
      );
    }

    member.changeActivityStatus(this.activityStatus);

    await this.memberRepository.update(member);
  };
}
