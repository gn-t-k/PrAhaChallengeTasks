import { Identifier } from "domain/__shared__/identifier";
import { Team } from "domain/team//entity/team";

export interface IGetTeamByID {
  id: Identifier;
}
export interface IGetTeamByPairID {
  pairID: Identifier;
}

export interface IGetTeamByMemberID {
  memberID: Identifier;
}

export interface ITeamRepository {
  getByID(props: IGetTeamByID): Promise<Team | null>;
  getByPairID(props: IGetTeamByPairID): Promise<Team | null>;
  getByMemberID(props: IGetTeamByMemberID): Promise<Team | null>;
  update(team: Team): Promise<void>;
}
