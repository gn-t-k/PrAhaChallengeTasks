import { Identifier } from "domain/shared/identifier";
import { ITeamRepository } from "domain/team/team-repository-interface";

export class IsMemberExistsInTeam {
  private readonly repository: ITeamRepository;

  public constructor(repository: ITeamRepository) {
    this.repository = repository;
  }

  public execute = async (memberID: Identifier): Promise<boolean> => {
    const team = await this.repository.getByMemberID({ memberID });

    return team !== null;
  };
}
