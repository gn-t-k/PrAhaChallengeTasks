interface TeamDTO {
  id: string;
  name: string;
  pairIDList: string[];
}

export type GetAllTeamDTO = TeamDTO[];

export interface IGetAllTeamQueryService {
  execute(): Promise<GetAllTeamDTO>;
}
