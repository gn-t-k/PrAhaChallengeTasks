import { Team } from "domain/team//entity/team";

export interface IGetTeamByID {
  id: string;
}
export interface IGetTeamByPairID {
  pairID: string;
}

export interface ITeamRepository {
  getByID(props: IGetTeamByID): Promise<Team>;
  getByPairID(props: IGetTeamByPairID): Promise<Team>;
  save(team: Team): Promise<void>;
}
