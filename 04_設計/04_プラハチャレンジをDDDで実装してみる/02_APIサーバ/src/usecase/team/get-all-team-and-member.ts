import { ITeamRepository, ITeamStructure } from "domain/team/team-repository";

export class GetAllTeamAndMember {
  private readonly teamRepository: ITeamRepository;

  constructor(teamRepository: ITeamRepository) {
    this.teamRepository = teamRepository;
  }

  public async execute(): Promise<ITeamStructure> {
    try {
      return await this.teamRepository.getAll();
    } catch {
      throw new Error("Failed to get data from repository");
    }
  }
}
