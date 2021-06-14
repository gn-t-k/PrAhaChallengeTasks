import { Team } from "domain/team//entity/team";

export interface IGetTeamByPairID {
  pairID: string;
}

export interface ITeamRepository {
  get(props: IGetTeamByPairID): Promise<Team>;
  addMemberToPair(team: Team): Promise<void>;
}
