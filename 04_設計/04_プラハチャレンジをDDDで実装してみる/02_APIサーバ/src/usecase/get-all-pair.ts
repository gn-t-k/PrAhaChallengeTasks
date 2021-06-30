import { Pair } from "domain/team/entity/pair";
import { Team } from "domain/team/entity/team";
import { ITeamRepository } from "domain/team/team-repository-interface";

export class GetAllPair {
  private readonly repository: ITeamRepository;

  public constructor(repository: ITeamRepository) {
    this.repository = repository;
  }

  public execute = async (): Promise<Pair[]> => {
    const teamList = await this.repository.getAll();

    return teamList.reduce(
      (pairList: Pair[], team: Team) => pairList.concat(team.pairList),
      [],
    );
  };
}
