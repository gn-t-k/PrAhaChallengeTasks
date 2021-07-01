import { Identifier } from "domain/__shared__/identifier";
import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { Team } from "domain/team/entity/team";
import { IsMemberExistsInTeamService } from "domain/team/service/is-member-exists-in-team-service";
import { PairFactory } from "domain/team/service/pair-factory";
import { TeamFactory } from "domain/team/service/team-factory";
import { ITeamRepository } from "domain/team/team-repository-interface";

export class RegisterPair {
  private readonly teamRepository: ITeamRepository;
  private readonly memberRepository: IMemberRepository;
  private readonly isMemberExistsInTeamService: IsMemberExistsInTeamService;

  public constructor(
    teamRepository: ITeamRepository,
    memberRepository: IMemberRepository,
    isMemberExistsInTeamService: IsMemberExistsInTeamService,
  ) {
    this.teamRepository = teamRepository;
    this.memberRepository = memberRepository;
    this.isMemberExistsInTeamService = isMemberExistsInTeamService;
  }

  public execute = async (
    teamID: string,
    pairName: string,
    memberIDList: string[],
  ): Promise<void> => {
    const [memberList, currentTeam] = await Promise.all([
      this.getMemberList(memberIDList.map((id) => new Identifier(id))),
      this.getTeam(teamID),
    ]);

    this.validatePairName(pairName, currentTeam);
    await this.validateMemberFree(memberList);

    const pair = PairFactory.execute({
      id: new Identifier().value,
      name: pairName,
      memberList,
    });
    const team = TeamFactory.execute({
      id: currentTeam.id.value,
      name: currentTeam.name,
      pairList: currentTeam.pairList.concat(pair),
    });

    await this.teamRepository.update(team);
  };

  private getMemberList = async (
    memberIDList: Identifier[],
  ): Promise<Member[]> => {
    const memberList = await this.memberRepository.getByIDList(memberIDList);

    return memberList.map((member) => {
      if (member === null) {
        throw new Error("Some or all member is not exists");
      }

      return member;
    });
  };

  private getTeam = async (teamID: string): Promise<Team> => {
    const team = await this.teamRepository.getByID({
      id: new Identifier(teamID),
    });

    if (team === null) {
      throw new Error("Team is not exists");
    }

    return team;
  };

  private validatePairName = (pairName: string, currentTeam: Team): void => {
    const currentPairNameList = currentTeam.pairList.map((pair) => pair.name);
    const isPairExists = currentPairNameList.some(
      (currentPairName) => currentPairName === pairName,
    );

    if (isPairExists) {
      throw new Error(`Pair ${pairName} is already exists in specified team`);
    }
  };

  private validateMemberFree = async (memberList: Member[]): Promise<void> => {
    // TODO: パフォーマンス悪い。1発で取得したい
    const isMemberExistsInTeamList = await Promise.all(
      memberList.map((member) =>
        this.isMemberExistsInTeamService.execute(member.id),
      ),
    );
    const isAllMemberFree = isMemberExistsInTeamList.every(
      (isMemberExistsInTeam) => isMemberExistsInTeam === false,
    );

    if (!isAllMemberFree) {
      throw new Error("Some or all member is already exists in team");
    }
  };
}
