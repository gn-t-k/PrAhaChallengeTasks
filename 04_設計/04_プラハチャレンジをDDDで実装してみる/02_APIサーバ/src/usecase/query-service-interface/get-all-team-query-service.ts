import { TeamDTO } from "usecase/query-service-interface/entity-dto/team-dto";

export type GetAllTeamDTO = TeamDTO[];

export interface IGetAllTeamQueryService {
  execute(): Promise<GetAllTeamDTO>;
}
