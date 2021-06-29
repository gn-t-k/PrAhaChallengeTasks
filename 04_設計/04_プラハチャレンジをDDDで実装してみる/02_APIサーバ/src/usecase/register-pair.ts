import { Identifier } from "domain/__shared__/identifier";
import { IMemberRepository } from "domain/member/member-repository-interface";
import { IsMemberExistsInTeamService } from "domain/team/service/is-member-exists-in-team-service";
import { IsPairExistsService } from "domain/team/service/is-pair-exists-service";
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
    const isPairExists = await this.isPairExistsService.execute(
      pairName,
      teamID,
    );

    if (isPairExists) {
      throw new Error(`Pair ${pairName} is already exists in specified team`);
    }

    const getMemberPromiseList = memberIDList.map((memberID) =>
      this.memberRepository.getByID(new Identifier(memberID)),
    );
    const memberList = await Promise.all(getMemberPromiseList);
    const isAllMemberExist = memberList.every((member) => member !== null);

    if (!isAllMemberExist) {
      throw new Error("Some or all member is not exists");
    }

    const isMemberExistsInTeamPromiseList = memberIDList.map((memberID) =>
      this.isMemberExistsInTeamService.execute(new Identifier(memberID)),
    );
    const isMemberExistsInTeamList = await Promise.all(
      isMemberExistsInTeamPromiseList,
    );
    const isAllMemberFree = isMemberExistsInTeamList.every(
      (isMemberExistsInTeam) => isMemberExistsInTeam === false,
    );

    if (!isAllMemberFree) {
      throw new Error("Some or all member is already exists in team");
    }

    // TODO: Pairオブジェクトの作成、登録
  };
}
