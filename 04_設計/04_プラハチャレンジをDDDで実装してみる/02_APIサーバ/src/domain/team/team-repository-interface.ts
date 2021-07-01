import { Identifier } from "domain/__shared__/identifier";
import { Team } from "domain/team//entity/team";

export interface IGetByID {
  id: Identifier;
}
export interface IGetByPairID {
  pairID: Identifier;
}

export interface IGetByMemberID {
  memberID: Identifier;
}

export interface IGetByPairName {
  pairName: string;
  teamID: Identifier;
}

export interface ITeamRepository {
  getByID(props: IGetByID): Promise<Team | null>;
  getByPairID(props: IGetByPairID): Promise<Team | null>;
  getByMemberID(props: IGetByMemberID): Promise<Team | null>;
  update(team: Team): Promise<void>;
}
