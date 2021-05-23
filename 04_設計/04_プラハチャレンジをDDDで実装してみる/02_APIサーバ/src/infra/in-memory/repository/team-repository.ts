import { ITeamRepository, ITeamStructure } from "domain/team/team-repository";

export class TeamRepository implements ITeamRepository {
  // eslint-disable-next-line class-methods-use-this
  public getAll(): Promise<ITeamStructure> {
    return Promise.resolve({ teamList: [], independentMemberList: [] });
  }
}
