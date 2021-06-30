import { Identifier } from "domain/__shared__/identifier";
import { Member } from "domain/member/entity/member";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { Team } from "domain/team/entity/team";
import { IsMemberExistsInTeamService } from "domain/team/service/is-member-exists-in-team-service";
import { IsPairExistsService } from "domain/team/service/is-pair-exists-service";
import { PairFactory } from "domain/team/service/pair-factory";
import { TeamFactory } from "domain/team/service/team-factory";
import { ITeamRepository } from "domain/team/team-repository-interface";

export class RegisterPair {
  private readonly teamRepository: ITeamRepository;
  private readonly memberRepository: IMemberRepository;
  private readonly isPairExistsService: IsPairExistsService;
  private readonly isMemberExistsInTeamService: IsMemberExistsInTeamService;

  public constructor(
    teamRepository: ITeamRepository,
    memberRepository: IMemberRepository,
    isPairExistsService: IsPairExistsService,
    isMemberExistsInTeamService: IsMemberExistsInTeamService,
  ) {
    this.teamRepository = teamRepository;
    this.memberRepository = memberRepository;
    this.isPairExistsService = isPairExistsService;
    this.isMemberExistsInTeamService = isMemberExistsInTeamService;
  }

  public execute = async (
    teamID: string,
    pairName: string,
    memberIDList: string[],
  ): Promise<void> => {
    const [memberList, currentTeam] = await Promise.all([
      this.getMemberList(memberIDList),
      this.getTeam(teamID),
    ]);

    await Promise.all([
      this.validatePairName(pairName, teamID),
      this.validateMemberFree(memberList),
    ]);

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

  private getMemberList = async (memberIDList: string[]): Promise<Member[]> => {
    const memberList = await Promise.all(
      memberIDList.map((memberID) =>
        this.memberRepository.getByID(new Identifier(memberID)),
      ),
    );

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

  private validatePairName = async (
    pairName: string,
    teamID: string,
  ): Promise<void> => {
    const isPairExists = await this.isPairExistsService.execute(
      pairName,
      teamID,
    );

    if (isPairExists) {
      throw new Error(`Pair ${pairName} is already exists in specified team`);
    }
  };

  private validateMemberFree = async (memberList: Member[]): Promise<void> => {
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
