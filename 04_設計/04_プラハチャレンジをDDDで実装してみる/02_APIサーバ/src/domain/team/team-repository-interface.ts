import { Identifier } from "domain/shared/identifier";
import { Team } from "domain/team//entity/team";

export interface IGetTeamByID {
  id: Identifier;
}
export interface IGetTeamByPairID {
  pairID: Identifier;
}

export interface ITeamRepository {
  getByID(props: IGetTeamByID): Promise<Team>;
  getByPairID(props: IGetTeamByPairID): Promise<Team>;
  update(team: Team): Promise<void>;
}
