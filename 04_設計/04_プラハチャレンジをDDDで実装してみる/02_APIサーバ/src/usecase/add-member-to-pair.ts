import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { Identifier } from "domain/shared/identifier";
import { Team } from "domain/team/entity/team";
import { ITeamRepository } from "domain/team/team-repository-interface";

export class AddMemberToPair {
  private readonly teamRepository: ITeamRepository;
  private readonly memberRepository: IMemberRepository;

  public constructor(
    teamRepository: ITeamRepository,
    memberRepository: IMemberRepository,
  ) {
    this.teamRepository = teamRepository;
    this.memberRepository = memberRepository;
  }

  public execute = async (memberID: string, pairID: string): Promise<void> => {
    const [targetTeam, targetMember] = await Promise.all([
      this.teamRepository.getByPairID({ pairID: new Identifier(pairID) }),
      this.memberRepository.getByID(new Identifier(memberID)),
    ]);

    if (targetMember === null) {
      throw new Error("Member is not exists");
    }
    if (targetTeam === null) {
      throw new Error("Team is not exists");
    }
    if (AddMemberToPair.isMemberExistsInTeam(targetMember, targetTeam)) {
      throw new Error(`${targetMember.name} is already exists in another pair`);
    }

    const replacedPairList = targetTeam.pairList.map((pair) => {
      if (pair.id.value !== pairID) return pair;

      return pair.addMember(targetMember);
    });

    const { id, name, pairList } = targetTeam;
    const replacedTeam = Team.rebuild(id, {
      name,
      pairList,
    }).updatePairList(replacedPairList);

    await this.teamRepository.update(replacedTeam);
  };

  private static isMemberExistsInTeam = (member: Member, team: Team) => {
    const memberList = team.pairList.reduce(
      (m: Member[], p) => m.concat(p.memberList),
      [],
    );

    return memberList.some((m) => m.equals(member));
  };
}
