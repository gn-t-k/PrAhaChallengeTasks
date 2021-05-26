import { ITeamRepository, ITeamStructure } from "domain/team/team-repository";

export class GetAllTeamAndMember {
  private readonly teamRepository: ITeamRepository;

  constructor(teamRepository: ITeamRepository) {
    this.teamRepository = teamRepository;
  }

  public async execute(): Promise<ITeamStructure> {
    const result = await this.teamRepository.getAll();

    return result;
  }
}
