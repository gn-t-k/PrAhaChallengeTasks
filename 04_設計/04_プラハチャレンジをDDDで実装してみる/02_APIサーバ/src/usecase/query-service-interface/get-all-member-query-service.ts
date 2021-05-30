interface OneOfGetAllMemberDTO {
  id: string;
  name: string;
  activityStatus: string;
  pairID: string | null;
  teamID: string | null;
}
export type GetAllMemberDTO = OneOfGetAllMemberDTO[];

export interface IGetAllMemberQueryService {
  execute(): Promise<GetAllMemberDTO>;
}
