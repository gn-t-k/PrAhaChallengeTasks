import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { Identifier } from "domain/shared/identifier";
import { Pair } from "domain/team/entity/pair";
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
      this.teamRepository.get({ pairID }),
      this.memberRepository.get({ id: memberID }),
    ]);

    if (AddMemberToPair.isMemberExistsInTeam(targetMember, targetTeam)) {
      throw new Error(`${targetMember.name} is already exists in another pair`);
    }

    const replacedPairList = targetTeam.pairList.map((pair) => {
      if (pair.id.value !== pairID) return pair;

      return Pair.rebuild(new Identifier(pairID), {
        name: pair.name,
        memberList: pair.memberList.concat(targetMember),
      });
    });
    const replacedTeam = Team.rebuild(targetTeam.id, {
      name: targetTeam.name,
      pairList: replacedPairList,
    });

    await this.teamRepository.addMemberToPair(replacedTeam);
  };

  private static isMemberExistsInTeam = (member: Member, team: Team) => {
    const memberList = team.pairList.reduce(
      (m: Member[], p) => m.concat(p.memberList),
      [],
    );

    return memberList.some((m) => m.equals(member));
  };
}
