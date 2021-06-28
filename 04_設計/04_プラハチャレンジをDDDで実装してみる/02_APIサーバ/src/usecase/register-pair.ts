import { IsPairExistsService } from "domain/team/service/is-pair-exists-service";
import { ITeamRepository } from "domain/team/team-repository-interface";

export class RegisterPair {
  private readonly repository: ITeamRepository;
  private readonly isPairExistsService: IsPairExistsService;

  public constructor(
    repository: ITeamRepository,
    isPairExistsService: IsPairExistsService,
  ) {
    this.repository = repository;
    this.isPairExistsService = isPairExistsService;
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

    // TODO: 参加者が存在するか、ペアに所属していないかチェック
    // TODO: Pairオブジェクトの作成、登録
  };
}
