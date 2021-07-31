import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { IsMemberExistsInTeamService } from "domain/team/service/is-member-exists-in-team-service";
import { ITeamRepository } from "domain/team/team-repository-interface";

export class DeleteMemberService {
  private readonly memberRepository: IMemberRepository;
  private readonly teamRepository: ITeamRepository;

  public constructor(
    memberRepository: IMemberRepository,
    teamRepository: ITeamRepository,
  ) {
    this.memberRepository = memberRepository;
    this.teamRepository = teamRepository;
  }

  public execute = async (member: Member): Promise<void> => {
    if (
      await new IsMemberExistsInTeamService(this.teamRepository).execute(
        member.id,
      )
    ) {
      throw new Error(
        "Cannnot delete member because member is belongs to pair",
      );
    }

    await this.memberRepository.delete(member);
  };
}
