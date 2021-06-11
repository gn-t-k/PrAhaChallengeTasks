interface MemberDTO {
  id: string;
  name: string;
  email: string;
  activityStatus: string;
  pairID: string | null;
  teamID: string | null;
}

export type GetAllMemberDTO = MemberDTO[];

export interface IGetAllMemberQueryService {
  execute(): Promise<GetAllMemberDTO>;
}
