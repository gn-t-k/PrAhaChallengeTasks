import { Team } from "domain/team//entity/team";

interface IGetTeamByPairID {
  pairID: string;
}

export interface ITeamRepository {
  get(props: IGetTeamByPairID): Promise<Team>;
  save(team: Team): Promise<void>;
}
