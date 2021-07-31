import { Identifier } from "domain/__shared__/identifier";
import { TeamFactory } from "domain/team/service/team-factory";
import { ITeamRepository } from "domain/team/team-repository-interface";

export class RemovePairFromTeam {
  private readonly teamRepository: ITeamRepository;

  public constructor(teamRepository: ITeamRepository) {
    this.teamRepository = teamRepository;
  }

  public execute = async (pairID: string): Promise<void> => {
    const team = await this.teamRepository.getByPairID({
      pairID: new Identifier(pairID),
    });

    if (team === null) {
      throw new Error("Pair is not exists");
    }

    const replacedTeam = TeamFactory.execute({
      id: team.id.value,
      name: team.name,
      pairList: team.pairList.filter(
        (pair) => !pair.id.equals(new Identifier(pairID)),
      ),
    });

    await this.teamRepository.update(replacedTeam);
  };
}
