import { Member } from "domain/team/entity/member";
import { Team } from "domain/team/entity/team";

export interface ITeamStructure {
  teamList: Team[];
  independentMemberList?: Member[];
}

export abstract class ITeamRepository {
  abstract getAll(): Promise<ITeamStructure>;
}
