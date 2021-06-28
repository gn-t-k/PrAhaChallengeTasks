import { Identifier } from "domain/__shared__/identifier";
import { ITeamRepository } from "domain/team/team-repository-interface";

export class IsPairExistsService {
  private readonly repository: ITeamRepository;

  public constructor(repository: ITeamRepository) {
    this.repository = repository;
  }

  public execute = async (
    pairName: string,
    teamID: string,
  ): Promise<boolean> => {
    const team = await this.repository.getByID({ id: new Identifier(teamID) });

    if (team === null) {
      throw new Error("Team is not exists");
    }

    const matchPairList = team.pairList.filter(
      (pair) => pair.name === pairName,
    );

    if (matchPairList.length > 1) {
      // TODO: データ不整合のため、ログ出す（出すとは言っていない）
      throw new Error("Pair name is dupulicated");
    }

    return matchPairList.length !== 0;
  };
}
